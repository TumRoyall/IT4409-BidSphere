import { useEffect, useState } from "react";
import "@/components/styles/HomeBanner.css"

import banner1 from "@/assets/banners/banner1.png";
import banner2 from "@/assets/banners/banner2.png";
import banner3 from "@/assets/banners/banner3.jpeg";
import banner4 from "@/assets/banners/banner4.png";
import banner5 from "@/assets/banners/banner5.png";
import bannerPhu1 from "@/assets/banners/banner_phu_1.png";
import bannerPhu2 from "@/assets/banners/banner_phu_2.jpeg";

const mainBanners = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
  { image: banner4 },
  { image: banner5 },
];

const rightTop = {
  image: bannerPhu1,
};
const rightBottom = {
  image: bannerPhu2,
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
