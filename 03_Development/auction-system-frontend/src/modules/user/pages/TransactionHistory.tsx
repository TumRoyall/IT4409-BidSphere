import { useEffect, useState } from "react";
import { getUserTransactions, type Transaction } from "@/api/modules/transaction.api";
import "@/modules/user/styles/TransactionHistory.css";
import TransactionIcon from "@/components/icons/TransactionIcon";

const PAGE_SIZE = 12;

export default function TransactionHistory({ userId }: { userId: number }) {
  const [data, setData] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const fetchData = async (pageIndex = 0) => {
    const res = await getUserTransactions(userId, {
      page: pageIndex,
      size: PAGE_SIZE,
      status: status || undefined,
      type: type || undefined,
      from: from ? `${from}T00:00:00` : undefined,
      to: to ? `${to}T23:59:59` : undefined
    });

    setData(res.data.content);
    setTotalPages(res.data.totalPages);
    setPage(res.data.number);
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  return (
    <div className="transaction-page">
      <h2 className="page-title">Lịch sử giao dịch</h2>

      {/* FILTER */}
      <div className="filter-box">
        <div className="filter-item">
          <label>Từ ngày</label>
          <input type="date" value={from} onChange={e => setFrom(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Đến ngày</label>
          <input type="date" value={to} onChange={e => setTo(e.target.value)} />
        </div>

        <div className="filter-item">
          <label>Trạng thái</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="SUCCESS">Thành công</option>
            <option value="PENDING">Đang xử lý</option>
            <option value="FAILED">Thất bại</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Loại giao dịch</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Tất cả</option>
            <option value="DEPOSIT">Nạp tiền</option>
            <option value="WITHDRAW">Rút tiền</option>
            <option value="TRANSFER">Chuyển tiền</option>
            <option value="RECEIVED">Nhận tiền</option>
          </select>
        </div>

        <button className="btn-filter" onClick={() => fetchData(0)}>
          Lọc
        </button>
      </div>

      {/* LIST TRANSACTIONS */}
      <div className="tx-list">
        {data.length === 0 && (
          <div className="empty">Không có dữ liệu</div>
        )}

        {data.map(tx => {
          const isIn = tx.amount > 0 || tx.type === "RECEIVED";

          return (
            <div className="tx-item" key={tx.id}>
              {/* ICON */}
              <TransactionIcon direction={isIn ? "in" : "out"} />

              {/* CONTENT */}
              <div className="tx-content">
                <div className="tx-title">
                  {isIn ? "TIỀN VÀO" : "TIỀN RA"}
                </div>

                <div className="tx-desc">
                  {tx.type} · Mã GD {tx.id}
                </div>
              </div>

              {/* RIGHT */}
              <div className="tx-right">
                <div className={`tx-amount ${isIn ? "plus" : "minus"}`}>
                  {tx.amount.toLocaleString()} VND
                </div>
                <div className="tx-time">
                  {new Date(tx.createdAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 0} onClick={() => fetchData(page - 1)}>
          ← Trước
        </button>

        <span>
          Trang {page + 1} / {totalPages || 1}
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => fetchData(page + 1)}
        >
          Sau →
        </button>
      </div>
    </div>
  );
}
