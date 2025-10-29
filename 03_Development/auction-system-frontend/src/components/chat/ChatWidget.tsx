import { useState } from "react";
import styles from "./chat.module.css";
import { Minus, X } from "lucide-react";
import robotIcon from "@/assets/robot.png";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "staff", text: "Xin chào 👋, chúng tôi có thể giúp gì cho bạn?" },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Nút mở chat (robot) */}
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

      {/* Hộp chat */}
      {open && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderLeft}>
              <img src={robotIcon} alt="logo" className={styles.headerLogo} />
              <div>
                <div className={styles.brandName}>1xBid Support Team</div>
                <div className={styles.subText}>GS. Minh Đức đang tham gia cuộc trò chuyện</div>
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
            {messages.length === 0 ? (
              <p className={styles.placeholder}>Hãy nhập nội dung bạn cần hỗ trợ 👇</p>
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
              placeholder="Nhập nội dung..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
}
