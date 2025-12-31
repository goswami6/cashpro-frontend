// src/pages/HomeLoan.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Home,
  Percent,
  Clock,
  FileText,
  CheckCircle2,
  Building2,
  Paintbrush,
  Landmark,
  ArrowRight,
} from "lucide-react";


const iconMap = {
  Home, Percent, Clock, FileText, CheckCircle2, Building2, Paintbrush, Landmark
};

const HomeLoan = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    api.get("/loan-page/home-loan")
      .then((res) => {
        if (res.data) setData(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data found</div>;

  const { hero, benefits, loanTypes, process, whyChoose } = data;

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full border border-primary/20">
              <span className="text-xs font-bold uppercase tracking-widest">{hero.badge}</span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-black text-dark leading-tight">
              {hero.heading} <br />
              <span className="text-primary italic">{hero.highlight}</span>
            </h1>

            <p className="text-gray-500 lg:text-xl max-w-lg mx-auto lg:mx-0">
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 justify-center group">
                {hero.ctaText || "Apply Now"} <ArrowRight />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative w-full">
            <div className="rounded-[60px] overflow-hidden shadow-2xl">
              <img src={hero.image} alt="Home" className="w-full h-[600px] object-cover" />
            </div>
            
            <div className="hidden md:block absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl animate-bounce-slow">
              <p className="text-xs font-bold uppercase text-gray-500 mb-1">
                Interest Starts From
              </p>
              <p className="text-3xl font-black text-primary">8.40%*</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="bg-gray-50/50 py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {benefits?.map((b, i) => {
            const IconTag = iconMap[b.icon] || Percent; // आइकन को मैप करना
            return (
              <div key={i} className="group p-8 bg-white rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all">
                  <IconTag size={26} />
                </div>
                <h4 className="text-2xl font-black">{b.title}</h4>
                <p className="text-gray-500">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= LOAN TYPES ================= */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <h3 className="text-4xl lg:text-5xl font-black">Solutions for Every Journey.</h3>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {loanTypes?.map((l, i) => {
              const IconTag = iconMap[l.icon] || Home;
              return (
                <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 hover:border-primary transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <IconTag size={24} />
                    </div>
                    <h4 className="text-lg font-bold">{l.title}</h4>
                  </div>
                  <p className="text-gray-500 text-sm">{l.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="py-24 bg-dark rounded-[60px] mx-6 mb-12 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-4xl lg:text-6xl font-black mb-4">{process.title}</h3>
          <p className="text-gray-400 mb-16">{process.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {process.steps?.map((step, i) => (
              <div key={i} className="relative text-left">
                <div className="text-7xl font-black text-white/5 absolute -top-10">{step.step}</div>
                <div className="relative z-10 pt-8">
                  <h4 className="text-xl font-bold flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-primary"></span> {step.title}
                  </h4>
                  <p className="text-gray-400 mt-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
           {/* लेफ्ट साइड की इमेजेज वैसे ही रहेंगी */}
           <div className="w-1/2 space-y-8">
             <h3 className="text-4xl lg:text-6xl font-black">{whyChoose.title}</h3>
             <p className="text-gray-500 text-lg">{whyChoose.subtitle}</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChoose.features?.map((f, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 size={14} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-dark">{f.title}</h4>
                      <p className="text-gray-400 text-sm">{f.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HomeLoan;




