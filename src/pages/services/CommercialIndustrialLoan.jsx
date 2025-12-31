// src/pages/CommercialIndustrialLoan.jsx
import React from 'react';
import { 
  Building2, Factory, Warehouse, ShoppingBag, 
  Map, Ruler, Coins, HardHat, 
  ArrowUpRight, BarChart, FileCheck2, Lightbulb 
} from 'lucide-react';

const assets = [
  { title: "Office Spaces", desc: "Funding for Grade-A corporate offices and co-working hubs.", icon: Building2 },
  { title: "Manufacturing Units", desc: "Specialized loans for factory setups and industrial sheds.", icon: Factory },
  { title: "Warehousing", desc: "Strategic funding for logistics parks and storage facilities.", icon: Warehouse },
  { title: "Retail Outlets", desc: "Purchase premium high-street shops or mall spaces.", icon: ShoppingBag },
];

const CommercialIndustrialLoan = () => {
  return (
    <div className="bg-white min-h-screen">
      
      {/* ================= 1. ARCHITECTURAL HERO ================= */}
      <section className="relative pt-22 pb-24 lg:pt-28 lg:pb-40 px-6 overflow-hidden bg-white">
        {/* Subtle Blueprint Grid Effect */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
              <Map size={18} className="text-primary" />
              <span className="text-dark text-[10px] font-black uppercase tracking-widest">Asset-Backed Financing</span>
            </div>
            <h1 className="text-5xl lg:text-8xl font-black text-dark leading-[0.9] tracking-tighter">
  Invest in{" "}
  <span className="text-primary">Space.</span>{" "}
  Grow in <span className="italic">Scale.</span>
</h1>

            <p className="text-lg lg:text-xl text-gray-500 max-w-lg leading-relaxed">
              Unlock the potential of commercial and industrial real estate with high-quantum loans and competitive yields.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-dark text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-primary transition-all flex items-center gap-3 group">
                Get Quotation <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl skew-y-3 group-hover:skew-y-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Skyscraper" 
                className="w-full h-[500px] lg:h-[650px] object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            {/* Stats Card */}
            <div className="absolute -top-10 -right-4 lg:-right-10 bg-white p-8 rounded-2xl shadow-2xl border-l-8 border-primary animate-pulse-slow">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Max Funding</p>
              <p className="text-4xl font-black text-dark">₹100Cr+</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. ASSET GRID (Blueprint Style) ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assets.map((asset, i) => (
              <div key={i} className="bg-white p-10 border border-gray-100 hover:border-primary transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <asset.icon size={120} />
                </div>
                <asset.icon className="text-primary mb-8" size={40} />
                <h4 className="text-2xl font-black text-dark mb-4 uppercase tracking-tight">{asset.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{asset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 3. TECHNICAL SPECIFICATIONS ================= */}
      <section className="py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-20 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/3">
             <h2 className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-4">Loan Specs</h2>
             <h3 className="text-4xl lg:text-5xl font-black text-dark leading-tight">Engineered for Businesses.</h3>
             <div className="mt-10 space-y-8">
                {[
                  { label: "Loan to Value", val: "Up to 70%", icon: BarChart },
                  { label: "Max Tenure", val: "15 Years", icon: Coins },
                  { label: "Processing", val: "Quick Disbursal", icon: FileCheck2 }
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary">
                      <spec.icon size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">{spec.label}</p>
                      <p className="text-xl font-black text-dark">{spec.val}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-10 bg-dark rounded-[40px] text-white flex flex-col justify-between">
               <Lightbulb className="text-primary mb-20" size={48} />
               <div>
                  <h4 className="text-2xl font-bold mb-4">Industrial Property</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Funding for MIDC/GIDC plots, warehouses, and factory expansions with customized repayment cycles matching your business production.</p>
               </div>
            </div>
            <div className="p-10 bg-primary rounded-[40px] text-white flex flex-col justify-between">
               <Building2 className="text-white mb-20" size={48} />
               <div>
                  <h4 className="text-2xl font-bold mb-4">Commercial Purchase</h4>
                  <p className="text-white/80 text-sm leading-relaxed">Acquire your own office or shop instead of paying rent. Leverage the power of Lease Rental Discounting (LRD) to lower your EMIs.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. BLUEPRINT STEPS (Vertical) ================= */}
      <section className="py-24 bg-gray-50 mx-6 rounded-[60px] mb-20">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-center text-4xl lg:text-6xl font-black text-dark mb-20">The Acquisition Path</h3>
          <div className="space-y-12">
            {[
              { step: "01", title: "Property Appraisal", desc: "Technical evaluation and market valuation of the commercial asset." },
              { step: "02", title: "Legal Vetting", desc: "Clear titles and NOC verification by our specialized legal team." },
              { step: "03", title: "Credit Sanction", desc: "Structured approval based on business cash flows or rental income." },
              { step: "04", title: "Disbursal", desc: "Final agreement signing and fund transfer to the seller." }
            ].map((path, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-8 items-start group">
                <span className="text-6xl font-black text-primary/20 group-hover:text-primary transition-colors">{path.step}</span>
                <div className="pt-2">
                  <h4 className="text-2xl font-black text-dark mb-2">{path.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{path.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CommercialIndustrialLoan;