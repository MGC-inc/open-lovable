"use client";

import { useEffect, useState } from "react";

const SLIDES = [
  { modifier: "-slide01", image: "/assets/img/home/img_kv01.jpg", text: "/assets/img/home/txt_kv01.svg" },
  { modifier: "-slide02", image: "/assets/img/home/img_kv02.jpg", text: "/assets/img/home/txt_kv02.svg" },
  { modifier: "-slide03", image: "/assets/img/home/img_kv03.jpg", text: "/assets/img/home/txt_kv03.svg" }
];

const INTERVAL = 4000;

/** Cross-fading key visual, on the same 4s cadence as the original slider. */
export default function KvSlider() {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((index) => {
        setPrevious(index);
        return (index + 1) % SLIDES.length;
      });
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="p-kv">
      <ul className="p-kv__slider js-homeSlider slick-slider slick-initialized">
        {SLIDES.map((slide, index) => (
          <li
            key={slide.modifier}
            className={[
              "slick-slide",
              index === current ? "slick-current is-anime" : "",
              index === previous && index !== current ? "is-prev" : ""
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={index !== current}
          >
            <div className={`p-kv__slide ${slide.modifier}`}>
              <div className="p-kv__img">
                <figure className="c-ofi">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slide.image} alt="" className="c-ofi__img" />
                </figure>
              </div>
              <div className="p-kv__txt c-inner">
                <object data={slide.text} type="image/svg+xml" aria-label="" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
