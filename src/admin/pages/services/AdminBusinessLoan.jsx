import { useEffect, useState } from "react";
import api from "../../../api/api";
import { 
  Save, Plus, Trash2, Layout, Briefcase, 
  Target, ShieldCheck, Image as ImageIcon, Type 
} from "lucide-react";

export default function AdminBusinessLoan() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    hero: {
      badge: "",
      heading: "",
      highlight: "",
      description: "",
      image: "",
      ctaText: "",
      stat: { value: "", label: "" },
    },
    products: [],
    industries: [],
    eligibility: {
      title: "",
      points: [],
      cardTitle: "",
      cardDesc: "",
      cardCta: "",
    },
  });

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    api.get("/business-loan")
      .then((res) => res.data && setForm(res.data))
      .catch(console.error);
  }, []);

  /* ================= HELPERS ================= */
  const updateHero = (k, v) =>
    setForm({ ...form, hero: { ...form.hero, [k]: v } });

  const updateArray = (key, i, field, value) => {
    const arr = [...form[key]];
    arr[i][field] = value;
    setForm({ ...form, [key]: arr });
  };

  const removeItem = (key, i) => {
    const arr = [...form[key]];
    arr.splice(i, 1);
    setForm({ ...form, [key]: arr });
  };

  const save = async () => {
    try {
      setLoading(true);
      await api.post("/business-loan", form);
      alert("Business Loan Updated Successfully");
    } catch (err) {
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  // UI Header Component
  const SectionHeader = ({ icon: Icon, title, desc }) => (
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
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Business Loan <span className="text-indigo-600">CMS</span></h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content Management System</p>
          </div>
          <button
            onClick={save}
            disabled={loading}
            className="flex items-center gap-3 bg-slate-900 hover:bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : <><Save size={18} /> Save All Changes</>}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* ================= HERO SECTION ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionHeader icon={Layout} title="Hero Section" desc="Main heading, sub-text and visual assets." />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Badge Text</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Badge" value={form.hero.badge} onChange={e => updateHero("badge", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Heading</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Heading" value={form.hero.heading} onChange={e => updateHero("heading", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Highlight Text</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Highlight" value={form.hero.highlight} onChange={e => updateHero("highlight", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Button CTA</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="CTA Text" value={form.hero.ctaText} onChange={e => updateHero("ctaText", e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Hero Image URL</label>
              <div className="flex gap-4">
                <input className="flex-1 p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium text-indigo-600" placeholder="Image URL" value={form.hero.image} onChange={e => updateHero("image", e.target.value)} />
                {form.hero.image && <img src={form.hero.image} className="w-14 h-14 rounded-xl object-cover border border-slate-200" alt="preview" />}
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Description</label>
              <textarea className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium h-32 resize-none" placeholder="Description" value={form.hero.description} onChange={e => updateHero("description", e.target.value)} />
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionHeader icon={Briefcase} title="Products & Services" desc="The core offerings displayed in grids." />
          <div className="space-y-4">
            {form.products.map((p, i) => (
              <div key={i} className="group flex flex-col md:flex-row gap-4 p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-indigo-100 transition-all">
                <div className="md:w-1/4 space-y-2">
                  <input className="w-full p-3 bg-white rounded-xl border-none font-bold text-sm shadow-sm outline-none" placeholder="Title" value={p.title} onChange={e => updateArray("products", i, "title", e.target.value)} />
                  <input className="w-full p-3 bg-white rounded-xl border-none text-[10px] shadow-sm outline-none font-mono" placeholder="Icon (e.g. Building2)" value={p.icon} onChange={e => updateArray("products", i, "icon", e.target.value)} />
                </div>
                <div className="flex-1">
                  <textarea className="w-full p-3 bg-white rounded-xl border-none text-sm shadow-sm outline-none h-full min-h-[80px] resize-none" placeholder="Description" value={p.desc} onChange={e => updateArray("products", i, "desc", e.target.value)} />
                </div>
                <button className="self-center p-3 text-slate-300 hover:text-red-500 transition-colors" onClick={() => removeItem("products", i)}>
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-all"
            onClick={() => setForm({ ...form, products: [...form.products, { title: "", desc: "", icon: "" }] })}>
            <Plus size={18} className="bg-indigo-600 text-white rounded-full p-0.5" /> Add Product
          </button>
        </section>

        {/* ================= INDUSTRIES ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionHeader icon={Target} title="Industries" desc="Target market sectors." />
          <div className="grid md:grid-cols-2 gap-4">
            {form.industries.map((ind, i) => (
              <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-2xl items-center border border-transparent hover:border-indigo-100 transition-all">
                <input className="flex-1 p-3 bg-white rounded-xl border-none font-bold text-sm shadow-sm outline-none" placeholder="Industry Name" value={ind.name} onChange={e => updateArray("industries", i, "name", e.target.value)} />
                <input className="w-1/3 p-3 bg-white rounded-xl border-none text-[10px] shadow-sm outline-none font-mono" placeholder="Icon (e.g. Store)" value={ind.icon} onChange={e => updateArray("industries", i, "icon", e.target.value)} />
                <button className="text-slate-300 hover:text-red-500 transition-colors" onClick={() => removeItem("industries", i)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-all"
            onClick={() => setForm({ ...form, industries: [...form.industries, { name: "", icon: "" }] })}>
            <Plus size={18} className="bg-indigo-600 text-white rounded-full p-0.5" /> Add Industry
          </button>
        </section>

        {/* ================= ELIGIBILITY ================= */}
        <section className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
          <SectionHeader icon={ShieldCheck} title="Eligibility & Criteria" desc="Requirements for the loan application." />
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Section Title</label>
              <input className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold" placeholder="Eligibility Title" value={form.eligibility.title}
                onChange={e => setForm({ ...form, eligibility: { ...form.eligibility, title: e.target.value } })} />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-slate-400 ml-1">Key Points (Checklist)</label>
              {form.eligibility.points.map((p, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-none p-4 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="font-black text-xs">{i+1}</span>
                  </div>
                  <input className="flex-1 p-4 bg-slate-50 rounded-xl border-none outline-none text-sm font-medium" value={p}
                    onChange={e => {
                      const pts = [...form.eligibility.points];
                      pts[i] = e.target.value;
                      setForm({ ...form, eligibility: { ...form.eligibility, points: pts } });
                    }} />
                  <button className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    onClick={() => {
                      const pts = [...form.eligibility.points];
                      pts.splice(i, 1);
                      setForm({ ...form, eligibility: { ...form.eligibility, points: pts } });
                    }}><Trash2 size={18} /></button>
                </div>
              ))}
              <button className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-tighter hover:underline"
                onClick={() => setForm({ ...form, eligibility: { ...form.eligibility, points: [...form.eligibility.points, ""] } })}>
                + Add Criteria Point
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}