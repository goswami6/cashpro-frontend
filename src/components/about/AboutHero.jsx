// src/components/AboutHero.jsx
import React from 'react';
import { Award, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-28 lg:px-20 lg:pb-32 overflow-hidden bg-white">
      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-50 z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* --- Left Side: Content --- */}
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-dark/5 border border-dark/10 text-dark">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest pl-2">Since 2014 • Trusted by Thousands</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-heading font-black text-dark leading-[1.1] tracking-tight">
              We Bridge the Gap <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
                To Your Dreams.
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              At <span className="text-dark font-bold">CashPro</span>, we believe financial assistance should be as unique as your goals. We provide expert-led solutions for growth and stability.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-2 group"
              >
                Apply for Loan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link  to="/"
              className="px-8 py-4 bg-white text-dark border-2 border-dark/10 font-bold rounded-2xl hover:bg-gray-50 transition-all">
                Our Story
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-100">
              <div>
                <h4 className="text-3xl font-black text-dark">10Y+</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-dark">5K+</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Happy Clients</p>
              </div>
              <div>
                <h4 className="text-3xl font-black text-dark">50+</h4>
                <p className="text-sm text-gray-500 font-bold uppercase tracking-tighter">Bank Partners</p>
              </div>
            </div>
          </div>

          {/* --- Right Side: Visual Image Grid --- */}
          <div className="relative">
            {/* Main Image with Glassmorphism Card */}
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl z-20 group">
              <img
                src="https://img.freepik.com/free-photo/businesspeople-working-as-team_1098-803.jpg?semt=ais_hybrid&w=740&q=80"
                alt="Our Team"
                className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl z-30 border border-gray-100 hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="text-primary w-7 h-7" />
                </div>
                <div>
                  <p className="text-dark font-black text-lg">ISO Certified</p>
                  <p className="text-gray-500 text-sm">Secure & Verified Process</p>
                </div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/20 rounded-full -z-10 animate-spin-slow"></div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutHero;