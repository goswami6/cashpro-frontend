// src/components/CoreValues.jsx
import React from "react";
import { ShieldCheck, Eye, Zap, HeartHandshake } from "lucide-react";

const values = [
  {
    title: "Unwavering Integrity",
    desc: "We uphold the highest ethical standards, ensuring every transaction is honest.",
    icon: ShieldCheck,
    color: "#3b82f6",
  },
  {
    title: "Radical Transparency",
    desc: "No hidden charges. We believe in clear communication at every step.",
    icon: Eye,
    color: "#10b981",
  },
  {
    title: "Customer Centricity",
    desc: "Your financial goals are our priority. We tailor solutions for you.",
    icon: HeartHandshake,
    color: "#f43f5e",
  },
  {
    title: "Operational Speed",
    desc: "Time is money. Our digital-first approach ensures fastest processing.",
    icon: Zap,
    color: "#f59e0b",
  },
];

const CoreValues = () => {
  return (
    <section className="bg-[#0a0a0a] text-white overflow-hidden py-14 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* ---------- HEADER ---------- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 animate-fadeIn">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 sm:w-12 h-[2px] bg-primary animate-expandLine"></span>
              <span className="text-primary uppercase tracking-[0.3em] text-[10px] sm:text-xs font-bold">
                Our DNA
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight">
              The Principles <br />
              <span className="text-gray-500 hover:text-white transition-colors duration-500">
                We Live By.
              </span>
            </h3>
          </div>

          <p className="text-gray-500 max-w-xs text-sm sm:text-base lg:text-lg italic opacity-0 animate-slideInRight">
            "Foundation of trust built on years of financial excellence."
          </p>
        </div>

        {/* ---------- VALUES GRID ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 sm:gap-y-12 gap-x-12 lg:gap-x-16">
          {values.map((item, index) => (
            <div
              key={index}
              className={`relative group flex gap-5 sm:gap-6 items-start opacity-0 animate-revealUp ${
                index % 2 !== 0 ? "lg:mt-16" : ""
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background Number */}
              <span className="absolute -top-6 sm:-top-10 -left-3 sm:-left-6 text-[80px] sm:text-[120px] font-black text-white/[0.03] select-none transition-all duration-700 group-hover:text-primary/10 group-hover:-translate-y-3">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="relative z-10 animate-float">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center transition-all duration-1000 group-hover:border-primary group-hover:rotate-180">
                  <div
                    className="w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-transform duration-700 group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon
                      size={22}
                      style={{ color: item.color }}
                      className="sm:hidden"
                    />
                    <item.icon
                      size={28}
                      style={{ color: item.color }}
                      className="hidden sm:block group-hover:animate-pulse"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 pt-2 sm:pt-4">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 transition-all duration-300 group-hover:text-primary group-hover:translate-x-2">
                  {item.title}
                </h4>

                <div className="w-0 group-hover:w-16 sm:group-hover:w-20 h-[2px] bg-primary mb-3 sm:mb-4 transition-all duration-500"></div>

                <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-sm group-hover:text-gray-200 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- ANIMATIONS ---------- */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes expandLine {
          from { width: 0; }
          to { width: 48px; }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-revealUp { animation: revealUp 0.8s ease-out forwards; }
        .animate-expandLine { animation: expandLine 1.2s ease-in-out forwards; }
        .animate-slideInRight { animation: slideInRight 1s ease-out 0.5s forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default CoreValues;
