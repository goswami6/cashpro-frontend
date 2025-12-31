// src/pages/InstitutionalLoan.jsx
import React from 'react';
import {
  School, Hospital, Activity, GraduationCap,
  Building2, Construction, Microscope, Briefcase,
  ArrowRight, ShieldCheck, TrendingUp, Landmark
} from 'lucide-react';

const solutions = [
  {
    title: "Educational Institutes",
    desc: "Loans for purchasing land, construction of campuses, or acquiring existing schools/universities.",
    icon: School,
    tags: ["K-12 Schools", "Colleges", "Vocational Centers"]
  },
  {
    title: "Healthcare Facilities",
    desc: "Specialized funding for multispecialty hospitals, diagnostic centers, and nursing homes.",
    icon: Hospital,
    tags: ["Medical Hubs", "Labs", "Wellness Centers"]
  }
];

const features = [
  { title: "High Loan Quantum", desc: "Funding solutions from ₹5 Crore to ₹200 Crore+.", icon: Landmark },
  { title: "Longer Moratorium", desc: "Grace periods tailored for construction phases.", icon: Construction },
  { title: "Low Interest Rates", desc: "Preferred rates for social infrastructure projects.", icon: TrendingUp },
  { title: "Equipment Finance", desc: "Asset-based loans for MRI, Scanners, and Labs.", icon: Microscope },
];

const InstitutionalLoan = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* ================= 1. VISIONARY HERO ================= */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden bg-[#0A0F1C]">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[160px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-2/3 space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full backdrop-blur-md">
                <ShieldCheck size={18} className="text-primary" />
                <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">Infrastructure Financing</span>
              </div>
              <h1 className="text-5xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                Building the <br />
                <span className="text-primary italic">Pillars of Society.</span>
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl max-w-2xl leading-relaxed">
                Empowering visionary leaders to expand education and healthcare infrastructure with structured institutional funding solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-primary/40">
                  Discuss Your Project <ArrowRight />
                </button>
              </div>
            </div>

            <div className="lg:w-1/3 hidden lg:block">
              <div className="relative p-8 border border-white/10 rounded-[40px] bg-white/5 backdrop-blur-md">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <Activity className="text-primary" />
                    <span className="text-white font-bold">HealthCare Funding</span>
                  </div>
                  <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <GraduationCap className="text-primary" />
                    <span className="text-white font-bold">Education Expansion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. CORE SOLUTIONS (Institutional Cards) ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="
            group relative 
            p-6 sm:p-10 lg:p-16 
            rounded-[32px] sm:rounded-[48px] lg:rounded-[60px]
            bg-gray-50 
            border border-gray-100 
            hover:bg-white hover:shadow-2xl 
            transition-all duration-700
          "
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-white rounded-2xl sm:rounded-3xl flex items-center justify-center mb-6 sm:mb-8 transform group-hover:-rotate-12 transition-transform duration-500">
                  <s.icon size={32} className="sm:hidden" />
                  <s.icon size={40} className="hidden sm:block" />
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-dark mb-4 sm:mb-6">
                  {s.title}
                </h3>

                <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
                  {s.desc}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {s.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 3. UNIQUE FEATURES (Technical Grid) ================= */}
      <section
        className="
    py-16 sm:py-20 lg:py-24
    bg-dark
    relative overflow-hidden
    w-full
    sm:mx-4 lg:mx-6
    rounded-none sm:rounded-[40px] lg:rounded-[60px]
  "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

          {/* HEADING */}
          <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-primary font-bold uppercase tracking-widest text-xs mb-4">
              Why Partner with CashPro?
            </h2>
            <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight">
              Structured Loans for <br /> Complex Assets.
            </h3>
          </div>

          {/* FEATURES GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {features.map((f, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-1 bg-primary mb-4 sm:mb-6"></div>
                <f.icon className="text-white mb-3 sm:mb-4" size={28} />
                <h4 className="text-lg sm:text-xl font-bold text-white">
                  {f.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ================= 4. ELIGIBILITY / DOCUMENTATION ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <h3 className="text-4xl lg:text-6xl font-black text-dark mb-8">What we look for in a project.</h3>
            <p className="text-gray-500 text-lg mb-12">Institutional lending requires a deep dive into the project's long-term sustainability. Our underwriting is fast but thorough.</p>

            <div className="space-y-6">
              {[
                "Proper land allotment papers / Lease deeds",
                "Approvals from Education Board / Health Ministry",
                "Proven track record of the Trust or Promoters",
                "Detailed Project Report (DPR) with cash flow projections"
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <p className="text-dark font-bold">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl grayscale">
              <img src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=2069&auto=format&fit=crop" alt="Institutional Architecture" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 hidden md:block">
              <p className="text-gray-400 text-xs font-bold uppercase mb-2">Max Tenure</p>
              <p className="text-4xl font-black text-dark">20 Years</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default InstitutionalLoan;