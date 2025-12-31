// src/components/Testimonials.jsx
import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import axios from "axios";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  /* ================= FETCH FROM BACKEND ================= */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/testimonials`
        );
        setTestimonials(res.data || []);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="bg-white overflow-hidden py-14 sm:py-16 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ---------- HEADER ---------- */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 sm:mb-3">
            Client Success Stories
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-dark tracking-tight">
            What Our Customers Say
          </h3>
        </div>

        {/* ---------- MARQUEE ---------- */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap py-8 sm:py-12">

            {[...testimonials, ...testimonials].map((item, index) => (
              <div
                key={index}
                className="
                  mx-3 sm:mx-4
                  w-[280px] sm:w-[340px] md:w-[420px]
                  bg-gray-50 rounded-3xl
                  p-6 sm:p-8
                  border border-gray-100
                  shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]
                  transition-all duration-500
                  hover:bg-white hover:-translate-y-2
                  whitespace-normal
                "
              >
                {/* Rating + Quote */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20" />
                </div>

                {/* Content */}
                <p className="text-gray-600 italic mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
                  “{item.content}”
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4 border-t border-gray-100 pt-4 sm:pt-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary object-cover"
                  />
                  <div>
                    <h4 className="text-dark font-bold text-base sm:text-lg">
                      {item.name}
                    </h4>
                    <p className="text-primary text-xs sm:text-sm font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* ---------- CTA ---------- */}
        <div className="mt-10 sm:mt-14 lg:mt-16 text-center">
          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Join 5,000+ satisfied clients across India.
          </p>
        </div>
      </div>

      {/* ---------- MARQUEE ANIMATION ---------- */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          width: fit-content;
          animation: marquee 28s linear infinite;
        }

        @media (hover: hover) {
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
