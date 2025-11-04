export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 text-center">
      <h1 className="text-5xl font-bold mb-4">Đấu giá trực tuyến dễ dàng</h1>
      <p className="text-lg mb-6">Khám phá những sản phẩm độc nhất – Giá trị thuộc về người nhanh nhất!</p>
      <a
        href="/auctions"
        className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
      >
        Tham gia ngay
      </a>
    </section>
  );
}
