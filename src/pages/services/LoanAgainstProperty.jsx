// src/pages/LoanAgainstProperty.jsx
import { useEffect, useState } from "react";
import api from "../../api/api";
import {
  Building,
  Landmark,
  ShieldCheck,
  Wallet,
  Banknote,
  Scale,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Percent,
  Ruler,
  Store,
  Factory,
} from "lucide-react";

/* ICON MAP (STRING → COMPONENT) */
const ICONS = {
  Building,
  Landmark,
  ShieldCheck,
  Wallet,
  Banknote,
  Scale,
  Briefcase,
  GraduationCap,
  Percent,
  Ruler,
  Store,
  Factory,
};

export default function LoanAgainstProperty() {
  const [data, setData] = useState(null);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    api
      .get("/loan-page/loan-against-property")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div className="space-y-8">
            <span className="bg-dark text-white px-4 py-2 rounded-full text-xs font-bold">
              {data.hero.badge}
            </span>

            <h1 className="text-5xl lg:text-8xl font-black text-dark">
              {data.hero.heading}{" "}
              <span className="text-primary italic">{data.hero.highlight}</span>
            </h1>

            <p className="text-lg text-gray-500">
              {data.hero.description}
            </p>

            <div className="flex gap-4">
              <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black">
                {data.hero.ctaText || "Apply Now"} <ArrowRight className="inline ml-2" />
              </button>
            </div>
          </div>

          <img
            src={data.hero.image}
            alt="Property"
            className="rounded-[60px] shadow-2xl"
          />
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data.benefits.map((b, i) => {
            const Icon = ICONS[b.icon];
            return (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
                  {Icon && <Icon size={28} />}
                </div>
                <h4 className="text-2xl font-black">{b.title}</h4>
                <p className="text-gray-500">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PROPERTY TYPES ================= */}
      <section className="bg-dark py-24 px-6 rounded-[60px] mx-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {data.loanTypes.map((t, i) => {
            const Icon = ICONS[t.icon];
            return (
              <div key={i} className="bg-white/10 p-10 rounded-[40px] text-center">
                {Icon && <Icon size={36} className="text-primary mx-auto mb-6" />}
                <h4 className="text-white text-2xl font-black">{t.title}</h4>
                <p className="text-gray-400">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          <h3 className="text-4xl lg:text-6xl font-black">
            {data.whyChoose.title}
          </h3>

          <ul className="space-y-4">
            {data.whyChoose.features.map((f, i) => (
              <li key={i} className="flex gap-3 items-start">
                <CheckCircle size={18} className="text-primary mt-1" />
                <span className="text-gray-600 font-bold">
                  {f.title} – {f.desc}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </section>

    </div>
  );
}
