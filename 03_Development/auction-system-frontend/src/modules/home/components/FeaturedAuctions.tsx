const mockAuctions = [
  { id: 1, name: "MacBook Pro M2", price: "22.000.000đ", img: "https://cdn.tgdd.vn/Products/Images/44/313689/macbook-pro-16-inch-m3-1-1.jpg" },
  { id: 2, name: "Tranh sơn dầu phong cảnh", price: "2.500.000đ", img: "https://noithatmanhhe.vn/media/27060/tranh-son-dau-phong-canh.jpg" },
  { id: 3, name: "Xe Vespa cổ", price: "17.000.000đ", img: "https://cdn.baogiaothong.vn/files/dungnguyen/2021/05/26/anh-1-vespa-co-0944.jpg" },
];

export default function FeaturedAuctions() {
  return (
    <section className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Phiên đấu giá nổi bật</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockAuctions.map((a) => (
          <div key={a.id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
            <img src={a.img} alt={a.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{a.name}</h3>
              <p className="text-indigo-600 font-bold mt-2">{a.price}</p>
              <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
