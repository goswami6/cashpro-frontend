// src/pages/TestimonialsPage.jsx
import { useEffect, useState } from "react";
import {
  Star,
  Quote,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const TestimonialsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH TESTIMONIALS ================= */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/testimonials`
        );
        setReviews(res.data || []);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <section className="bg-dark relative overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
            <MessageSquare className="text-primary w-4 h-4" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">
              Client Voices
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black text-white mb-5 tracking-tight">
            Real Stories, Real{" "}
            <span className="text-primary">Success.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover why thousands of individuals and businesses trust Payback
            Money Mantra for their financial journey.
          </p>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: "Happy Clients", value: "5,000+", icon: CheckCircle2 },
            { label: "Success Rate", value: "98%", icon: Star },
            { label: "Bank Partners", value: "50+", icon: ArrowRight },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-5 sm:p-6 lg:p-8 rounded-[28px] shadow-xl flex items-center gap-5 border border-gray-100 hover:scale-105 transition-transform"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <stat.icon size={24} />
              </div>
              <div>
                <h4 className="text-2xl sm:text-3xl font-black text-dark">
                  {stat.value}
                </h4>
                <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TESTIMONIAL GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 py-14 sm:py-16 lg:py-20">
        {loading ? (
          <p className="text-center text-gray-400">Loading testimonials...</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-400">
            No testimonials available
          </p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="break-inside-avoid bg-white p-6 sm:p-8 lg:p-10 rounded-[32px] sm:rounded-[40px] border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
              >
                <Quote className="absolute top-6 right-6 sm:right-8 text-gray-50 group-hover:text-primary/5 w-14 h-14 sm:w-20 sm:h-20 transition-colors" />

                <div className="relative z-10">
                  <div className="flex gap-1 mb-4 sm:mb-6">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="currentColor"
                        className="text-primary"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed italic mb-6 sm:mb-8">
                    “{review.content}”
                  </p>

                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-primary/20 group-hover:border-primary transition-colors"
                    />
                    <div>
                      <h4 className="text-dark font-black text-sm sm:text-base">
                        {review.name}
                      </h4>
                      <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase">
                        {review.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 inline-block px-4 py-1 bg-gray-50 rounded-full text-[10px] font-black uppercase text-primary border border-gray-100 group-hover:bg-primary group-hover:text-white transition-all">
                    {review.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= CTA ================= */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:pb-20 lg:pb-24">
        <div className="bg-primary rounded-[32px] sm:rounded-[40px] lg:rounded-[50px] p-8 sm:p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/30">
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight relative z-10">
            Ready to start your own <br /> success story?
          </h2>

          <Link to="/contact" className="relative z-10 bg-white text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:scale-110 hover:shadow-2xl transition-all active:scale-95">
            Apply Now & Get Funded
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsPage;
