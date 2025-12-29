import { useState, useRef, useEffect } from "react";
import styles from "./chat.module.css";
import { Minus, X } from "lucide-react";
import robotIcon from "@/assets/robot.png";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

// ĐỔI MODEL Ở ĐÂY! (model hợp lệ cho v1beta)
const MODEL_NAME = "gemini-2.0-flash-lite";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  
  const chatSessionRef = useRef<any>(null);
  const countdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Khởi tạo chat session với system prompt RÚT GỌN
  const initializeChatSession = () => {
    if (!chatSessionRef.current) {
      const shortSystemPrompt = "Bạn là trợ lý đấu giá 1xBid. Chỉ trả lời về đấu giá.";
      
      chatSessionRef.current = model.startChat({
        generationConfig: {
          maxOutputTokens: 500, // Giới hạn output
        },
        history: [
          {
            role: "user",
            parts: [{ text: shortSystemPrompt }],
          },
          {
            role: "model",
            parts: [{ text: "Hiểu. Tôi chỉ hỗ trợ về đấu giá." }],
          },
        ],
      });
    }
  };

  const startCountdown = (seconds: number) => {
    setQuotaExceeded(true);
    setRetryAfter(seconds);
    
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
    }
    
    countdownIntervalRef.current = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current!);
          countdownIntervalRef.current = null;
          setQuotaExceeded(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSend = async () => {
    if (!input.trim() || loading || quotaExceeded) return;
    
    const userMessage = input.trim();
    
    // RÚT GỌN input nếu quá dài
    if (userMessage.length > 500) {
      alert("Tin nhắn quá dài. Vui lòng rút gọn dưới 500 ký tự.");
      return;
    }
    
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      initializeChatSession(); // Đảm bảo có session
      
      const result = await chatSessionRef.current.sendMessage(userMessage);
      const response = result.response.text();
      
      setMessages((prev) => [...prev, { sender: "staff", text: response }]);
    } catch (error: any) {
      console.error("API Error:", error);
      
      // Xử lý lỗi QUOTA cụ thể
      if (error?.status === 429) {
        let waitTime = 60;
        let errorMessage = "⚠️ Đã vượt quá hạn mức miễn phí.";
        
        // Trích xuất thời gian chờ từ error message
        const retryMatch = error.message?.match(/Please retry in (\d+\.?\d*)s/);
        if (retryMatch) {
          waitTime = Math.ceil(parseFloat(retryMatch[1]));
        }
        
        // Kiểm tra nếu là daily quota
        if (error.message?.includes("FreeTier") || error.message?.includes("limit: 0")) {
          errorMessage = `⏱️ Đã hết lượt sử dụng miễn phí hôm nay. Vui lòng thử lại sau ${Math.ceil(waitTime/60)} phút.`;
          
          // Nếu là daily limit, đề xuất đổi model
          if (waitTime > 300) {
            errorMessage += "\n\n💡 Gợi ý: Hãy thử đổi sang model gemini-1.5-flash trong code.";
          }
        }
        
        startCountdown(waitTime);
        setMessages((prev) => [...prev, { sender: "staff", text: errorMessage }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "staff", text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau." },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      {!open && (
        <div className={styles.robotWrapper}>
          <div className={styles.robotTooltip}>Chat với chúng tôi</div>
          <img
            src={robotIcon}
            alt="chat bot"
            className={styles.robotIcon}
            onClick={() => setOpen(true)}
          />
        </div>
      )}

      {open && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              <img src={robotIcon} alt="logo" className={styles.headerLogo} />
              <div>
                <div className={styles.brandName}>1xBid Support</div>
                <div className={styles.subText}>Đang dùng: {MODEL_NAME}</div>
              </div>
            </div>

            <div className={styles.headerButtons}>
              <button onClick={() => setOpen(false)} title="Thu gọn">
                <Minus size={18} />
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setMessages([]);
                }}
                title="Đóng"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className={styles.chatBody}>
            {quotaExceeded && (
              <div className={styles.quotaAlert}>
                ⚠️ Đã hết lượt dùng. Có thể thử lại sau: {retryAfter}s
                <br/>
                <small>Model: {MODEL_NAME}</small>
              </div>
            )}
            
            {messages.length === 0 ? (
              <p className={styles.placeholder}>
                Hãy nhập câu hỏi về đấu giá...
                <br/>
                <small>(Tối đa 500 ký tự)</small>
              </p>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.sender === "user"
                      ? styles.userMessage
                      : styles.staffMessage
                  }
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder={quotaExceeded ? `Đợi ${retryAfter}s...` : "Câu hỏi về đấu giá..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={loading || quotaExceeded}
              maxLength={500}
            />
            <div className={styles.inputCounter}>
              {input.length}/500
            </div>
            <button 
              onClick={handleSend} 
              disabled={loading || quotaExceeded || !input.trim()}
            >
              {loading ? "..." : quotaExceeded ? `${retryAfter}s` : "Gửi"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}