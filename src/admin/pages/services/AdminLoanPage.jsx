import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/api";
import { 
  Save, Plus, Trash2, Layout, Gift, 
  CreditCard, Activity, Star, Image as ImageIcon 
} from "lucide-react";

export default function AdminLoanPage() {
  const { type } = useParams();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    hero: {
      badge: "",
      heading: "",
      highlight: "",
      description: "",
      image: "",
      ctaText: "",
      floatingStat: { value: "", label: "" },
    },
    benefits: [],
    loanTypes: [],
    process: { title: "", subtitle: "", steps: [] },
    whyChoose: { title: "", subtitle: "", features: [] },
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!type) return;
    api.get(`/loan-page/${type}`).then(res => {
      if (res.data) setForm(res.data);
    });
  }, [type]);

  /* ================= SAVE ================= */
  const save = async () => {
    try {
      setLoading(true);
      await api.post("/loan-page", { ...form, type });
      alert("Loan Page Updated Successfully");
    } catch (e) {
      alert("Save Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */
  const updateArray = (key, i, field, value) => {
    const arr = [...form[key]];
    arr[i][field] = value;
    setForm({ ...form, [key]: arr });
  };

  const removeArrayItem = (key, i) => {
    const arr = [...form[key]];
    arr.splice(i, 1);
    setForm({ ...form, [key]: arr });
  };

  const SectionHeader = ({ icon: Icon, title, desc }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-primary/10 text-primary rounded-2xl">
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-xl font-black text-dark tracking-tight">{title}</h2>
        <p className="text-sm text-gray-400 font-medium">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-5 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-dark capitalize">
              {(type || "loan").replace(/-/g, " ")} <span className="text-primary">CMS</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Page Configuration</p>
          </div>
          <button
            onClick={save}
            disabled={loading}
            className="flex items-center gap-3 bg-dark hover:bg-primary text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : <><Save size={18} /> Save Page</>}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* ================= HERO ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
          <SectionHeader icon={Layout} title="Hero Section" desc="Main visual entry point of the page." />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Badge</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="e.g. Best Rates" value={form.hero.badge} onChange={e => setForm({ ...form, hero:{ ...form.hero, badge:e.target.value } })} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Heading</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="Heading" value={form.hero.heading} onChange={e => setForm({ ...form, hero:{ ...form.hero, heading:e.target.value } })} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Highlight Word</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium text-primary" placeholder="Highlight Color Word" value={form.hero.highlight} onChange={e => setForm({ ...form, hero:{ ...form.hero, highlight:e.target.value } })} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">CTA Button Text</label>
              <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="Apply Now" value={form.hero.ctaText} onChange={e => setForm({ ...form, hero:{ ...form.hero, ctaText:e.target.value } })} />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Hero Image URL</label>
              <div className="flex gap-4">
                <input className="flex-1 p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium" placeholder="https://images.unsplash..." value={form.hero.image} onChange={e => setForm({ ...form, hero:{ ...form.hero, image:e.target.value } })} />
                {form.hero.image && <img src={form.hero.image} className="w-14 h-14 rounded-xl object-cover border border-gray-100" />}
              </div>
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Main Description</label>
              <textarea className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary/20 font-medium h-28 resize-none" placeholder="Description Text" value={form.hero.description} onChange={e => setForm({ ...form, hero:{ ...form.hero, description:e.target.value } })} />
            </div>
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
          <SectionHeader icon={Gift} title="Benefits" desc="Key advantages of this loan type." />
          <div className="space-y-4">
            {form.benefits.map((b, i) => (
              <div key={i} className="group flex flex-col md:flex-row gap-4 p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-primary/20 transition-all">
                <div className="md:w-1/4 space-y-2">
                  <input className="w-full p-3 bg-white rounded-xl border-none font-bold text-sm shadow-sm outline-none" placeholder="Benefit Title" value={b.title} onChange={e => updateArray("benefits", i, "title", e.target.value)} />
                  <input className="w-full p-3 bg-white rounded-xl border-none text-[10px] shadow-sm outline-none font-mono" placeholder="Icon (Percent)" value={b.icon} onChange={e => updateArray("benefits", i, "icon", e.target.value)} />
                </div>
                <div className="flex-1">
                  <textarea className="w-full p-3 bg-white rounded-xl border-none text-sm shadow-sm outline-none h-full min-h-[80px] resize-none" placeholder="Benefit Description" value={b.desc} onChange={e => updateArray("benefits", i, "desc", e.target.value)} />
                </div>
                <button className="self-center p-3 text-gray-300 hover:text-red-500 transition-colors" onClick={() => removeArrayItem("benefits", i)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-all"
            onClick={() => setForm({ ...form, benefits:[...form.benefits,{ title:"", desc:"", icon:"" }] })}>
            <Plus size={18} className="bg-primary text-white rounded-full p-0.5" /> Add Benefit
          </button>
        </section>

        {/* ================= LOAN TYPES ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
          <SectionHeader icon={CreditCard} title="Loan Variants" desc="Different types within this category." />
          <div className="grid md:grid-cols-2 gap-6">
            {form.loanTypes.map((l, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl space-y-3 relative group border border-transparent hover:border-primary/20 transition-all">
                <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500" onClick={() => removeArrayItem("loanTypes", i)}>
                  <Trash2 size={16} />
                </button>
                <input className="w-full p-3 bg-white rounded-xl border-none font-bold text-sm shadow-sm outline-none" placeholder="Type Title" value={l.title} onChange={e => updateArray("loanTypes", i, "title", e.target.value)} />
                <input className="w-full p-3 bg-white rounded-xl border-none text-[10px] shadow-sm outline-none font-mono" placeholder="Icon (Home)" value={l.icon} onChange={e => updateArray("loanTypes", i, "icon", e.target.value)} />
                <textarea className="w-full p-3 bg-white rounded-xl border-none text-sm shadow-sm outline-none h-20 resize-none" placeholder="Type Description" value={l.desc} onChange={e => updateArray("loanTypes", i, "desc", e.target.value)} />
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-all"
            onClick={() => setForm({ ...form, loanTypes:[...form.loanTypes,{ title:"", desc:"", icon:"" }] })}>
            <Plus size={18} className="bg-primary text-white rounded-full p-0.5" /> Add Loan Variant
          </button>
        </section>

        {/* ================= PROCESS ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
          <SectionHeader icon={Activity} title="Application Process" desc="The journey from apply to disburse." />
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" placeholder="Process Title" value={form.process.title} onChange={e => setForm({ ...form, process:{ ...form.process, title:e.target.value } })} />
            <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none" placeholder="Process Subtitle" value={form.process.subtitle} onChange={e => setForm({ ...form, process:{ ...form.process, subtitle:e.target.value } })} />
          </div>
          <div className="space-y-3">
            {form.process.steps.map((s, i) => (
              <div key={i} className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl group">
                <input className="w-16 p-3 bg-white rounded-xl border-none font-black text-center text-primary shadow-sm outline-none" placeholder="01" value={s.step} onChange={e => {
                  const steps=[...form.process.steps]; steps[i].step=e.target.value; setForm({ ...form, process:{ ...form.process, steps } });
                }} />
                <div className="flex-1 space-y-2">
                  <input className="w-full p-3 bg-white rounded-xl border-none font-bold text-sm shadow-sm outline-none" placeholder="Step Title" value={s.title} onChange={e => {
                    const steps=[...form.process.steps]; steps[i].title=e.target.value; setForm({ ...form, process:{ ...form.process, steps } });
                  }} />
                  <input className="w-full p-3 bg-white rounded-xl border-none text-sm shadow-sm outline-none" placeholder="Short description of the step" value={s.desc} onChange={e => {
                    const steps=[...form.process.steps]; steps[i].desc=e.target.value; setForm({ ...form, process:{ ...form.process, steps } });
                  }} />
                </div>
                <button className="p-3 text-gray-300 hover:text-red-500" onClick={() => {
                  const steps=[...form.process.steps]; steps.splice(i,1); setForm({ ...form, process:{ ...form.process, steps } });
                }}><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest"
            onClick={() => setForm({ ...form, process:{ ...form.process, steps:[...form.process.steps,{ step:"", title:"", desc:"" }] } })}>
            + Add Journey Step
          </button>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
          <SectionHeader icon={Star} title="Trust Features" desc="Why customers should choose us." />
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none font-bold" placeholder="Why Choose Title" value={form.whyChoose.title} onChange={e => setForm({ ...form, whyChoose:{ ...form.whyChoose, title:e.target.value } })} />
            <input className="w-full p-4 bg-gray-50 rounded-2xl border-none outline-none" placeholder="Subtitle" value={form.whyChoose.subtitle} onChange={e => setForm({ ...form, whyChoose:{ ...form.whyChoose, subtitle:e.target.value } })} />
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {form.whyChoose.features.map((f, i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-3xl relative group border border-transparent hover:border-primary/20 transition-all">
                <button className="absolute top-3 right-3 text-gray-300 hover:text-red-500" onClick={() => {
                  const features=[...form.whyChoose.features]; features.splice(i,1); setForm({ ...form, whyChoose:{ ...form.whyChoose, features } });
                }}><Trash2 size={14} /></button>
                <input className="w-full p-2 bg-white rounded-lg border-none font-bold text-xs mb-2 shadow-sm outline-none" placeholder="Feature Title" value={f.title} onChange={e => {
                  const features=[...form.whyChoose.features]; features[i].title=e.target.value; setForm({ ...form, whyChoose:{ ...form.whyChoose, features } });
                }} />
                <textarea className="w-full p-2 bg-white rounded-lg border-none text-[11px] shadow-sm outline-none h-16 resize-none" placeholder="Description" value={f.desc} onChange={e => {
                  const features=[...form.whyChoose.features]; features[i].desc=e.target.value; setForm({ ...form, whyChoose:{ ...form.whyChoose, features } });
                }} />
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest"
            onClick={() => setForm({ ...form, whyChoose:{ ...form.whyChoose, features:[...form.whyChoose.features,{ title:"", desc:"" }] } })}>
            + Add Feature Point
          </button>
        </section>

      </div>
    </div>
  );
}