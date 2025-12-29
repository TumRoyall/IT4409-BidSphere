const mockCategories = [
  { name: "Điện tử", icon: "💻" },
  { name: "Thời trang", icon: "👗" },
  { name: "Xe cộ", icon: "🚗" },
  { name: "Nội thất", icon: "🛋️" },
  { name: "Sưu tầm", icon: "📦" },
  { name: "Tiêu dùng", icon: "🛒" },
  { name: "Trang sức", icon: "💍" },
  { name: "Khác", icon: "📌" },
];

export default function CategoryList() {
  return (
    <section className="max-w-6xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-6">Danh mục nổi bật</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {mockCategories.map((cat, i) => (
          <div
            key={i}
            className="p-4 bg-gray-100 rounded-xl hover:bg-indigo-100 transition cursor-pointer"
          >
            <div className="text-3xl mb-2">{cat.icon}</div>
            <p className="font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
