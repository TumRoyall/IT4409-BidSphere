import "@/modules/auction/styles/activeFilters.css";

const CATEGORY_MAP: Record<string, string> = {
  electronics: "Điện tử",
  fashion: "Thời trang",
  vehicle: "Xe cộ",
  jewelry: "Trang sức",
  home: "Nhà cửa",
  garden: "Nhà & Vườn",
  grocery: "Tiêu dùng",
  other: "Khác",
};

const STATUS_MAP: Record<string, string> = {
  OPEN: "Đang diễn ra",
  PENDING: "Sắp diễn ra",
  CLOSED: "Đã kết thúc",
};


export default function ActiveFilters({ filters, onChange }: any) {
  const remove = (key: string) => {
    if (key === "price") {
      onChange({ minPrice: "", maxPrice: "", page: 1 });
      return;
    }
    onChange({ [key]: "", page: 1 });
  };

  const tags: { key: string; label: string }[] = [];

  if (filters.status)
    tags.push({
      key: "status",
      label: STATUS_MAP[filters.status] || filters.status,
    });

  if (filters.category)
    tags.push({
      key: "category",
      label: CATEGORY_MAP[filters.category] || filters.category,
    });

  if (filters.minPrice || filters.maxPrice)
    tags.push({
      key: "price",
      label: `${filters.minPrice || "0"} - ${filters.maxPrice || "∞"}`,
    });

  if (filters.keyword) tags.push({ key: "keyword", label: filters.keyword });

  if (tags.length === 0) return null;

  return (
    <div className="active-filters">
      <span className="title">Bộ lọc đang dùng:</span>

      {tags.map((t) => (
        <div className="filter-tag" key={t.key}>
          {t.label}
          <button onClick={() => remove(t.key)}>×</button>
        </div>
      ))}
    </div>
  );
}
