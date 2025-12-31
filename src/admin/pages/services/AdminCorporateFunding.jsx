import { useEffect, useState } from "react";
import api from "../../../api/api";
import { 
  Save, Plus, Trash2, Globe, Layout, 
  Briefcase, TrendingUp, Zap, CheckCircle 
} from "lucide-react";

export default function AdminCorporateFunding() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    hero: {
      badge: "",
      heading: "",
      highlight: "",
      description: "",
      image: "",
      ctaText: "",
      stats: [],
    },
    fundingSuite: [],
    advantages: [],
    process: {
      title: "",
      desc: "",
      cta: "",
      services: [],
    },
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    api.get("/corporate-funding")
      .then(res => res.data && setForm(res.data))
      .catch(console.error);
  }, []);

  /* ================= HELPERS ================= */
  const updateHero = (k, v) =>
    setForm({ ...form, hero: { ...form.hero, [k]: v } });

  const addItem = (key, item) =>
    setForm({ ...form, [key]: [...form[key], item] });

  const updateItem = (key, i, field, val) => {
    const copy = [...form[key]];
    copy[i][field] = val;
    setForm({ ...form, [key]: copy });
  };

  const removeItem = (key, i) => {
    const copy = [...form[key]];
    copy.splice(i, 1);
    setForm({ ...form, [key]: copy });
  };

  /* ================= SAVE ================= */
  const save = async () => {
    try {
      setLoading(true);
      await api.post("/corporate-funding", form);
      alert("Corporate Funding Updated Successfully");
    } catch (e) {
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  // UI Header Component for Sections
  const SectionTitle = ({ icon: Icon, title, desc }) => (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
        <p className="text-sm text-slate-400 font-medium">{desc}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-24">
      {/* Sticky Top Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 mb-12">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
              Corporate <span className="text-indigo-600">Funding</span> CMS
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Elite Content Manager</p>
          </div>
          <button
            onClick={save}
            disabled={loading}
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 active:scale-95"
          >
            {loading ? "Saving..." : <><Save size={20} /> Save All Changes</>}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* ================= HERO SECTION ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionTitle icon={Layout} title="Hero Section" desc="Main heading and top visuals." />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Badge Text</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Ex: Global Capital Solutions" value={form.hero.badge} onChange={e => updateHero("badge", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Heading</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Ex: Finance" value={form.hero.heading} onChange={e => updateHero("heading", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Highlight Text (Italic)</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Ex: At Scale." value={form.hero.highlight} onChange={e => updateHero("highlight", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">CTA Button Text</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Ex: Explore Capital" value={form.hero.ctaText} onChange={e => updateHero("ctaText", e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Hero Image URL</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="https://..." value={form.hero.image} onChange={e => updateHero("image", e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Hero Description</label>
              <textarea className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium h-32 resize-none" placeholder="Short intro description..." value={form.hero.description} onChange={e => updateHero("description", e.target.value)} />
            </div>
          </div>
        </section>

        {/* ================= FUNDING SUITE ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionTitle icon={Briefcase} title="Funding Suite" desc="Services displayed in the clean grid." />
          <div className="space-y-4">
            {form.fundingSuite.map((f, i) => (
              <div key={i} className="group flex flex-col md:flex-row gap-4 p-6 bg-slate-50 rounded-[24px] relative border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                <input className="md:w-1/4 p-3 bg-white rounded-xl border-none font-bold text-sm outline-none shadow-sm" placeholder="Title" value={f.title} onChange={e => updateItem("fundingSuite", i, "title", e.target.value)} />
                <input className="md:w-1/4 p-3 bg-white rounded-xl border-none font-medium text-xs outline-none shadow-sm" placeholder="Icon (Ex: Landmark)" value={f.icon} onChange={e => updateItem("fundingSuite", i, "icon", e.target.value)} />
                <input className="flex-1 p-3 bg-white rounded-xl border-none text-xs outline-none shadow-sm" placeholder="Description" value={f.desc} onChange={e => updateItem("fundingSuite", i, "desc", e.target.value)} />
                <button className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm" onClick={() => removeItem("fundingSuite", i)}><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
          <button className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:translate-x-1 transition-all" onClick={() => addItem("fundingSuite", { title: "", desc: "", icon: "" })}>
            <Plus size={20} className="bg-indigo-600 text-white rounded-full p-1" /> Add Funding Type
          </button>
        </section>

        {/* ================= ADVANTAGES ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionTitle icon={TrendingUp} title="Strategic Edge" desc="The '01, 02, 03' benefits section." />
          <div className="space-y-4">
            {form.advantages.map((a, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 p-6 bg-slate-50 rounded-[24px] border border-transparent hover:border-indigo-100 hover:bg-white transition-all">
                <span className="text-2xl font-black text-slate-200 self-center px-2">0{i+1}</span>
                <input className="md:w-1/3 p-4 bg-white rounded-xl border-none font-bold outline-none shadow-sm" placeholder="Advantage Title" value={a.title} onChange={e => updateItem("advantages", i, "title", e.target.value)} />
                <input className="flex-1 p-4 bg-white rounded-xl border-none text-sm outline-none shadow-sm" placeholder="Advantage Description" value={a.desc} onChange={e => updateItem("advantages", i, "desc", e.target.value)} />
                <button className="bg-red-50 text-red-400 p-4 rounded-xl hover:bg-red-500 hover:text-white transition-all" onClick={() => removeItem("advantages", i)}><Trash2 size={20}/></button>
              </div>
            ))}
          </div>
          <button className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:translate-x-1 transition-all" onClick={() => addItem("advantages", { title: "", desc: "" })}>
            <Plus size={20} className="bg-indigo-600 text-white rounded-full p-1" /> Add Advantage
          </button>
        </section>

        {/* ================= PROCESS SECTION ================= */}
        <div className="grid lg:grid-cols-5 gap-8">
          <section className="lg:col-span-3 bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
            <SectionTitle icon={Zap} title="Process Context" desc="Main text for the checklist section." />
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Process Heading</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-black" placeholder="Process Title" value={form.process.title} onChange={e => setForm({ ...form, process: { ...form.process, title: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">CFO/Process Description</label>
                <textarea className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 h-28 resize-none text-sm" placeholder="Process Description" value={form.process.desc} onChange={e => setForm({ ...form, process: { ...form.process, desc: e.target.value } })} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Checklist CTA Text</label>
                <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-bold" placeholder="CTA Text" value={form.process.cta} onChange={e => setForm({ ...form, process: { ...form.process, cta: e.target.value } })} />
              </div>
            </div>
          </section>

          <section className="lg:col-span-2 bg-slate-900 p-10 rounded-[40px] shadow-2xl text-white">
            <SectionTitle icon={CheckCircle} title="Checklist" desc="Dynamic service tags." />
            <div className="space-y-3">
              {form.process.services.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 p-3 bg-white/10 rounded-xl border border-white/5 outline-none text-sm focus:bg-white/20 transition-all" value={s} onChange={e => {
                      const arr = [...form.process.services];
                      arr[i] = e.target.value;
                      setForm({ ...form, process: { ...form.process, services: arr } });
                    }} />
                  <button className="text-white/20 hover:text-red-400 transition-colors" onClick={() => {
                      const arr = [...form.process.services];
                      arr.splice(i, 1);
                      setForm({ ...form, process: { ...form.process, services: arr } });
                    }}><Trash2 size={18}/></button>
                </div>
              ))}
              <button className="w-full mt-4 py-3 border-2 border-dashed border-white/10 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:border-indigo-500 hover:text-indigo-400 transition-all" onClick={() => setForm({ ...form, process: { ...form.process, services: [...form.process.services, ""] } })}>
                + Add Service Tag
              </button>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}