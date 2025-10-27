const mockSellers = [
  { name: "Nguyễn Văn A", rating: 4.9, sold: 120 },
  { name: "Trần Thị B", rating: 4.8, sold: 90 },
  { name: "Phạm Văn C", rating: 4.7, sold: 76 },
];

export default function TopSellers() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Top Người Bán Uy Tín</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {mockSellers.map((s, i) => (
            <div key={i} className="w-64 bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="text-5xl mb-3">👤</div>
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-yellow-500 mt-1">⭐ {s.rating}</p>
              <p className="text-gray-500 mt-1">{s.sold} phiên đã bán</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
