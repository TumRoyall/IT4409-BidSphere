import { useEffect, useState } from "react";
import "@/components/styles/HomeBanner.css"
const mainBanners = [
  { image: "https://placehold.co/1200x400/ff7b00/ffffff?text=Tao" },
  { image: "https://placehold.co/1200x400/0c6efd/ffffff?text=Là" },
  { image: "https://placehold.co/1200x400/f44336/ffffff?text=Bố" },
  { image: "https://placehold.co/1200x400/ff7b00/ffffff?text=Chúng" },
   { image: "https://placehold.co/1200x400/0c6efd/ffffff?text=Mày" },
];

const rightTop = {
  image: "https://placehold.co/600x190/fb4e32/ffffff?text=Nạp rút 1 phút",
};
const rightBottom = {
  image: "https://placehold.co/600x190/009688/ffffff?text=Tiền tý 3 phút",
};

export default function HomeBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % mainBanners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((i) => (i + 1) % mainBanners.length);
  const prev = () =>
    setIndex((i) => (i === 0 ? mainBanners.length - 1 : i - 1));

  return (
    <div className="banner-container">

      {/* Left Slider */}
      <div className="banner-left">
        {mainBanners.map((b, i) => (
          <div key={i} className={`slide ${i === index ? "active" : ""}`}>
            <img src={b.image} />
          </div>
        ))}

        {/* Buttons */}
        <button className="arrow arrow-left" onClick={prev}>❮</button>
        <button className="arrow arrow-right" onClick={next}>❯</button>

        {/* Dots */}
        <div className="dots">
          {mainBanners.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            ></div>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="banner-right">
        <img className="right-img" src={rightTop.image} />
        <img className="right-img" src={rightBottom.image} />
      </div>
    </div>
  );
}
