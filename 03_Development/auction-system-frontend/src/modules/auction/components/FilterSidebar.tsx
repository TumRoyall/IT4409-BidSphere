import "@/modules/auction/styles/filterSidebar.css";
import { SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { value: "Điện tử", label: "Điện tử" },
  { value: "Thời trang", label: "Thời trang" },
  { value: "Xe cộ", label: "Xe cộ" },
  { value: "Nội thất", label: "Nội thất" },
  { value: "Sưu tầm", label: "Sưu tầm" },
  { value: "Tiêu dùng", label: "Tiêu dùng" },
  { value: "Trang sức", label: "Trang sức" },
  { value: "Khác", label: "Khác" },
];

const STATUS_MAP: Record<string, string> = {
  OPEN: "Đang diễn ra",
  PENDING: "Sắp diễn ra",
};


export default function FilterSidebar({ filters, onChange }: any) {
  const update = (key: string, val: any) => {
    onChange({ [key]: val, page: 1 });
  };

  return (
    <div className="filter-sidebar">
    <div className="filter-header">
        <SlidersHorizontal size={16} />
        <span>Bộ lọc tìm kiếm</span>
      </div>
      <div className="filter-group">
        <p className="title">Trạng thái</p>
        {["OPEN", "PENDING"].map((st) => (
          <label key={st}>
            <input
              type="radio"
              checked={filters.status === st}
              onChange={() => update("status", st)}
            />
            {STATUS_MAP[st]}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <p className="title">Danh mục</p>
        {CATEGORIES.map((cat) => (
          <label key={cat.value}>
            <input
              type="radio"
              checked={filters.category === cat.value}
              onChange={() => update("category", cat.value)}
            />
            {cat.label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <p className="title">Khoảng giá</p>
        <input
          type="number"
          placeholder="Tối thiểu (đ)"
          value={filters.minPrice}
          onChange={(e) => update("minPrice", e.target.value)}
        />
        <input
          type="number"
          placeholder="Tối đa (đ)"
          value={filters.maxPrice}
          onChange={(e) => update("maxPrice", e.target.value)}
        />
      </div>
    </div>
  );
}
