// src/pages/CorporateFunding.jsx
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import api from "../../api/api";

export default function CorporateFunding() {
  const [data, setData] = useState(null);

  /* ================= FETCH BACKEND DATA ================= */
  useEffect(() => {
    api.get("/corporate-funding")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="bg-white min-h-screen text-dark">

      {/* ================= 1. ELITE HERO SECTION (Dynamic) ================= */}
      <section className="relative pt-22 pb-24 lg:pt-28 lg:pb-40 px-6 overflow-hidden bg-slate-50/50">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
              <Icons.Globe size={16} className="text-primary" />
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.4em]">
                {data.hero.badge}
              </span>
            </div>
            <h1 className="text-6xl lg:text-9xl font-black leading-[0.85] tracking-tighter text-dark">
              {data.hero.heading} <br />
              <span className="text-primary italic">{data.hero.highlight}</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-light">
              {data.hero.description}
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="bg-dark text-white px-12 py-6 rounded-sm font-black text-lg hover:bg-primary transition-all duration-500 flex items-center gap-4 uppercase tracking-widest shadow-xl">
                {data.hero.ctaText} <Icons.ArrowUpRight />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative border border-gray-200 rounded-2xl overflow-hidden bg-white p-4 shadow-2xl">
              <img
                src={data.hero.image}
                alt="Corporate Tower"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-lg"
              />
              {/* Floating Stat Overlay - Keeping the Elite Styling */}
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-xl border border-gray-100 rounded-xl shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-primary text-3xl font-black">₹500Cr+</p>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Single Ticket Size</p>
                  </div>
                  <div>
                    <p className="text-dark text-3xl font-black">48Hrs</p>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Indicative Terms</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. FUNDING SUITE (Dynamic Grid) ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-100 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
          {data.fundingSuite.map((item, i) => {
            const IconComponent = Icons[item.icon] || Icons.CircleDot; // Fallback icon
            return (
              <div key={i} className="p-12 hover:bg-slate-50 transition-all group bg-white">
                <IconComponent className="text-primary mb-8 group-hover:scale-110 transition-transform" size={40} />
                <h4 className="text-2xl font-black mb-4 uppercase tracking-tight text-dark">{item.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 3. STRATEGIC EDGE (Dynamic) ================= */}
      <section className="py-32 bg-slate-900 text-white rounded-t-[80px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-primary font-bold text-xs uppercase tracking-[0.4em]">Corporate Edge</h2>
              <h3 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
                Why Global Leaders <br />Partner with Us.
              </h3>
              <p className="text-gray-400 text-lg">We bridge the gap between complex institutional requirements and rapid fund deployment.</p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 gap-12">
              {data.advantages.map((adv, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-4xl font-black text-white/10 group-hover:text-primary transition-colors">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2">{adv.title}</h4>
                    <p className="text-gray-400 text-sm">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. THE PROCESS (Dynamic) ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto border border-gray-200 rounded-[40px] p-12 lg:p-24 bg-slate-50 shadow-inner">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h4 className="text-4xl font-black text-dark">{data.process.title}</h4>
              <p className="text-gray-500">{data.process.desc}</p>
              <div className="flex items-center gap-4 text-primary font-bold cursor-pointer group">
                <span>{data.process.cta}</span>
                <Icons.ArrowUpRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {data.process.services.map((tag, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:border-primary transition-colors shadow-sm">
                  <Icons.CheckCircle2 className="text-primary" size={20} />
                  <span className="font-bold tracking-tight text-dark">{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
