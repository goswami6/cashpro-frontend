// src/components/Mission.jsx
import React from "react";
import {
  Target,
  ShieldCheck,
  Heart,
  Zap,
  Globe,
  BarChart3,
  ChevronRight,
} from "lucide-react";

const Mission = () => {
  const values = [
    { name: "Customer Empowerment", icon: Heart },
    { name: "Responsible Borrowing", icon: ShieldCheck },
    { name: "Ethical & Transparent", icon: Globe },
    { name: "Service Improvement", icon: Zap },
    { name: "Economic Development", icon: BarChart3 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark py-14 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-24 top-5">

      {/* ---------- BACKGROUND ---------- */}
      <div
        className="absolute inset-0 z-0 scale-110 animate-slow-zoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ---------- LEFT CONTENT ---------- */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary shadow-[0_0_20px_rgba(30,142,62,0.3)]">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">
                Our Strategic Mission
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-7xl font-heading font-black text-white leading-tight tracking-tighter">
              Empowering Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                Financial Future.
              </span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl font-medium">
              Guiding customers toward responsible lending solutions that foster{" "}
              <span className="text-white border-b-2 border-primary">
                growth, stability, and long-term success.
              </span>
            </p>

            {/* ---------- VALUES ---------- */}
            <div className="pt-6 sm:pt-10 space-y-5">
              <p className="text-xs sm:text-sm text-gray-400 font-bold uppercase tracking-widest flex items-center">
                <span className="w-8 sm:w-10 h-[1px] bg-primary mr-4"></span>
                Guiding Principles
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl hover:bg-primary hover:border-primary transition-all duration-500 shadow-xl"
                  >
                    <value.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary group-hover:text-white" />
                    <span className="text-xs sm:text-sm font-bold text-gray-200">
                      {value.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ---------- RIGHT CARD ---------- */}
          <div className="relative group animate-float">

            <div className="absolute -inset-4 bg-primary/20 rounded-[50px] blur-2xl group-hover:bg-primary/30 transition-all duration-700" />

            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 lg:p-14 rounded-[36px] lg:rounded-[48px] shadow-2xl">

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white mb-8 lg:mb-10">
                Trusted by Thousands of <br />
                <span className="text-primary underline decoration-white/20 underline-offset-8">
                  Growing Businesses
                </span>
              </h3>

              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    title: "CashPro Global Services",
                    desc: "India's premier financial network.",
                  },
                  {
                    title: "Ultra-Fast Processing",
                    desc: "Disbursement within 24-48 hours.",
                  },
                  {
                    title: "Zero Hidden Costs",
                    desc: "100% Transparency in every contract.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 sm:gap-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg">
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 inline-block px-5 py-3 bg-primary/10 border border-primary/20 rounded-2xl">
                <p className="text-primary text-[10px] sm:text-xs font-black uppercase tracking-widest italic">
                  #1 Trusted Financial Partner 2024
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ---------- ANIMATIONS ---------- */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s linear infinite alternate;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Mission;
