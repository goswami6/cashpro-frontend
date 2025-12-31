import { useEffect, useState } from "react";
import api from "../../api/api";
import { ArrowRight } from "lucide-react";
import {
  Factory,
  ShieldCheck,
  TrendingUp,
  Coins,
  Zap,
  Settings,
  Boxes,
} from "lucide-react";

const ICONS = {
  Factory,
  ShieldCheck,
  TrendingUp,
  Coins,
  Zap,
  Settings,
  Boxes,
};

export default function MachineryLoan() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/loan-page/Machinary-loan")
      .then(res => {
        console.log("DATA 👉", res.data);
        setData(res.data);
      })
      .catch(err => console.error("ERROR ❌", err));
  }, []);

  if (!data) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-6">
            <span className="bg-dark text-white px-4 py-2 rounded-full text-xs font-bold">
              {data.hero?.badge}
            </span>

            <h1 className="text-4xl lg:text-7xl font-black">
              {data.hero?.heading} <br />
              <span className="text-primary italic">
                {data.hero?.highlight}
              </span>
            </h1>

            <p className="text-gray-500 text-lg">
              {data.hero?.description}
            </p>

            <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black">
              {data.hero?.ctaText} <ArrowRight className="inline ml-2" />
            </button>
          </div>

          <img
            src={data.hero?.image}
            alt="Machinery"
            className="rounded-[60px] shadow-2xl"
          />
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.benefits?.map((b, i) => {
            const Icon = ICONS[b.icon] || Boxes;
            return (
              <div key={i} className="p-8 border rounded-3xl">
                <Icon className="text-primary mb-4" size={32} />
                <h4 className="text-2xl font-black">{b.title}</h4>
                <p className="text-gray-500">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* LOAN TYPES */}
      <section className="bg-dark py-24 px-6 rounded-[60px] mx-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {data.loanTypes?.map((t, i) => {
            const Icon = ICONS[t.icon] || Boxes;
            return (
              <div key={i} className="bg-white/10 p-10 rounded-[40px]">
                <Icon size={36} className="text-primary mb-6" />
                <h4 className="text-white text-2xl font-black">{t.title}</h4>
                <p className="text-gray-400">{t.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          <h3 className="text-4xl lg:text-6xl font-black">
            Why Choose Our Machinery Loans?
          </h3>

          <ul className="space-y-4">
            {data.whyChoose?.features?.map((f, i) => (
              <li key={i} className="flex gap-3 items-start">
                <Boxes size={18} className="text-primary mt-1" />
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
