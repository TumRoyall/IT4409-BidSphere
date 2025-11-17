import "@/modules/auction/styles/sortBar.css";
import { LayoutGrid, List } from "lucide-react";

export default function SortBar({ filters, onChange, viewMode, setViewMode }: any) {
  const options = [
    { value: "startTime", label: "Thời gian bắt đầu" },
    { value: "endTime", label: "Thời gian kết thúc" },
    { value: "highestCurrentPrice", label: "Giá hiện tại" },
  ];

  const [field, direction] = (filters.sort || "startTime,desc").split(",");

  const updateField = (f: string) => {
    onChange({ sort: `${f},${direction}`, page: 1 });
  };

  const toggleDir = () => {
    const nextDir = direction === "asc" ? "desc" : "asc";
    onChange({ sort: `${field},${nextDir}`, page: 1 });
  };

  return (
    <div className="sort-bar">
      <div className="left">
        <span className="label">Sắp xếp bởi:</span>

        <select
          className="sort-select"
          value={field}
          onChange={(e) => updateField(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <button className="sort-dir-btn" onClick={toggleDir}>
          {direction === "asc" ? "↑ Tăng dần" : "↓ Giảm dần"}
        </button>
      </div>

      <div className="view-switch">
        <button
          className={viewMode === "list" ? "active" : ""}
          onClick={() => setViewMode("list")}
        >
          <List size={20}/>
        </button>

        <button
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => setViewMode("grid")}
        >
          <LayoutGrid size={20}/>
        </button>
      </div>
    </div>
  );
}
