// src/components/HeroSlider.jsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH FROM BACKEND ---------------- */
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/hero`
        );
        setSlides(res.data || []);
      } catch (error) {
        console.error("Failed to fetch hero slides", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) return null;
  if (!slides.length) return null;

  return (
    <div className="relative w-full h-auto lg:h-[calc(100vh-76px)] group">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full custom-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden">
              <img
                src={
                  slide.image.startsWith("http")
                    ? slide.image
                    : `${import.meta.env.VITE_API_URL.replace("/api", "")}${slide.image}`
                }
                alt="Hero Banner"
                className="w-full h-full object-contain lg:object-cover"
              />

              {/* OPTIONAL OVERLAY */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Pagination Styling --- */}
      <style>{`
        .custom-swiper .swiper-pagination {
          bottom: 30px !important;
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .custom-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: white;
          opacity: 0.5;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .custom-swiper .swiper-pagination-bullet-active {
          width: 35px;
          background: #1e8e3e;
          opacity: 1;
          box-shadow: 0 0 12px rgba(30, 142, 62, 0.6);
        }

        @media (max-width: 640px) {
          .custom-swiper .swiper-pagination-bullet-active {
            width: 25px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;
