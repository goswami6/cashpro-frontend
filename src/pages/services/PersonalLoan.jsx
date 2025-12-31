// src/pages/PersonalLoan.jsx
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import api from "../../api/api";

export default function PersonalLoan() {
  const [data, setData] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    api.get("/personal-loan")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return null;

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative pt-28 pb-32 px-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-white to-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <Icons.Zap size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                {data.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl lg:text-8xl font-black text-dark leading-[0.9]">
              {data.hero.heading}
              <br />
              <span className="text-primary italic">
                {data.hero.highlight}
              </span>
            </h1>

            <p className="text-lg text-gray-500 max-w-lg">
              {data.hero.description}
            </p>

            <button className="bg-dark text-white px-10 py-5 rounded-2xl font-black flex gap-3 items-center">
              {data.hero.ctaText}
              <Icons.ArrowRight />
            </button>
          </div>

          <div className="lg:w-1/2">
            <img
              src={data.hero.image}
              className="rounded-[50px] shadow-2xl"
              alt="Personal Loan"
            />
          </div>
        </div>
      </section>

      {/* ================= PURPOSES ================= */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-3xl lg:text-5xl font-black text-center mb-16">
          One Loan, Many Reasons.
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {data.purposes.map((p, i) => {
            const Icon = Icons[p.icon];
            return (
              <div
                key={i}
                className={`${p.bg} p-8 rounded-[40px] text-center hover:scale-105 transition`}
              >
                <div className={`${p.color} mb-4 flex justify-center`}>
                  {Icon && <Icon size={48} />}
                </div>
                <h4 className="text-xl font-black">{p.title}</h4>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-24 bg-gray-50 rounded-[60px] mx-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {data.benefits.map((b, i) => {
            const Icon = Icons[b.icon];
            return (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary">
                  {Icon && <Icon size={30} />}
                </div>
                <h4 className="text-2xl font-black">{b.title}</h4>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-dark rounded-[60px] p-20 flex flex-col lg:flex-row gap-16">

          <div className="lg:w-1/2 text-white">
            <h3 className="text-5xl font-black mb-10">
              {data.eligibility.title}
            </h3>

            {data.eligibility.points.map((p, i) => (
              <div key={i} className="flex gap-4 mb-4">
                <Icons.CheckCircle className="text-primary" />
                <span className="text-gray-300">{p}</span>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2 bg-white/5 backdrop-blur-xl rounded-[40px] p-12">
            <h4 className="text-2xl font-black text-white mb-6">
              Required Documents
            </h4>

            <div className="grid sm:grid-cols-2 gap-6">
              {data.documents.map((d, i) => (
                <div key={i}>
                  <p className="text-primary text-xs uppercase font-bold">
                    {d.category}
                  </p>
                  <p className="text-gray-300 text-sm">{d.value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
