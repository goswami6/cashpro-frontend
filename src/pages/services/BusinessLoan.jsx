// src/pages/BusinessLoan.jsx
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import api from "../../api/api";

export default function BusinessLoan() {
  const [data, setData] = useState(null);

  /* ================= FETCH BACKEND DATA ================= */
  useEffect(() => {
    api.get("/business-loan")
      .then(res => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
   <div className="bg-white min-h-screen text-dark">
      
      {/* ================= 1. HERO SECTION (Dynamic) ================= */}
      <section className="relative pt-22 pb-20 lg:pt-28 lg:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-dark text-white px-4 py-2 rounded-xl shadow-xl">
              <Icons.TrendingUp size={16} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                {data.hero.badge}
              </span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-dark leading-tight tracking-tighter">
              {data.hero.heading} <br />
              <span className="text-primary">{data.hero.highlight}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-500 max-w-lg leading-relaxed">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 group">
                {data.hero.ctaText} 
                <Icons.ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="w-full sm:px-6 lg:px-0">
              <div className="relative w-full rounded-none sm:rounded-[60px] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 group border-0 sm:border-8 border-gray-50">
                <img
                  src={data.hero.image}
                  alt="Business Growth"
                  className="w-full h-[320px] sm:h-[500px] lg:h-[650px] object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Floating Stat Overlay */}
            {data.hero.stat?.value && (
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 hidden md:block animate-bounce-slow">
                <div className="flex flex-col gap-1 text-center">
                  <p className="text-4xl font-black text-dark">{data.hero.stat.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {data.hero.stat.label}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= 2. PRODUCT GRID (Dynamic) ================= */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.products.map((p, i) => {
              const IconComp = Icons[p.icon] || Icons.Briefcase;
              return (
                <div key={i} className="p-10 bg-white rounded-[40px] border border-gray-100 hover:border-primary/50 transition-all group shadow-sm hover:shadow-xl">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all">
                    <IconComp size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-dark mb-4">{p.title}</h4>
                  <p className="text-gray-500 leading-relaxed text-sm font-medium">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 3. INDUSTRY FOCUS (Dynamic) ================= */}
      <section className="py-14 sm:py-20 lg:py-24 container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-16">
          <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-dark lg:w-1/2">
            Loans for every Industry.
          </h3>
          <p className="text-gray-500 lg:w-1/3">
            Whether you're a neighborhood retailer or a large-scale manufacturer,
            we have the right credit tools for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.industries.map((ind, i) => {
            const IndIcon = Icons[ind.icon] || Icons.Check;
            return (
              <div key={i} className="flex items-center gap-4 p-5 sm:p-8 bg-white border-2 border-gray-50 rounded-[32px] hover:border-primary transition-all group">
                <div className="text-dark group-hover:text-primary transition-colors">
                  <IndIcon size={28} />
                </div>
                <span className="text-base sm:text-lg font-bold text-dark">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. ELIGIBILITY (Dynamic) ================= */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="w-full sm:px-6 lg:px-6">
          <div className="w-full max-w-7xl mx-auto bg-dark rounded-none sm:rounded-[80px] p-6 sm:p-24 relative overflow-hidden">
            
            {/* GRID BACKGROUND */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
              <div className="grid grid-cols-12 h-full">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="border-r border-b border-white/20"></div>
                ))}
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* LEFT */}
              <div className="space-y-8">
                <h3 className="text-4xl lg:text-6xl font-black text-white leading-tight">
                  {data.eligibility.title}
                </h3>
                <div className="space-y-4">
                  {data.eligibility.points.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 text-white/80">
                      <Icons.CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={22} />
                      <span className="text-sm lg:text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-white/5 backdrop-blur-md rounded-[40px] p-8 lg:p-12 border border-white/10 flex flex-col justify-center">
                <h4 className="text-xl sm:text-2xl font-black text-white mb-6">
                  {data.eligibility.cardTitle}
                </h4>
                <div className="space-y-6">
                  <p className="text-gray-400">
                    {data.eligibility.cardDesc}
                  </p>
                  <button className="w-full bg-white text-dark py-5 rounded-2xl font-black hover:bg-primary hover:text-white transition-all">
                    {data.eligibility.cardCta}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
