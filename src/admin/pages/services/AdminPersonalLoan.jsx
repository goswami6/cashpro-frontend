import { useEffect, useState } from "react";
import api from "../../../api/api";
import { 
  Save, Plus, Trash2, Layout, Target, 
  CheckCircle, FileText, Sparkles, Image as ImageIcon 
} from "lucide-react";

export default function AdminPersonalLoan() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    hero: {
      badge: "",
      heading: "",
      highlight: "",
      description: "",
      image: "",
      ctaText: "",
    },
    purposes: [],
    benefits: [],
    eligibility: {
      title: "",
      points: [],
    },
    documents: [],
  });

  useEffect(() => {
    api.get("/personal-loan")
      .then((res) => res.data && setForm(res.data))
      .catch(console.error);
  }, []);

  const updateHero = (key, value) =>
    setForm({ ...form, hero: { ...form.hero, [key]: value } });

  const addItem = (key, item) =>
    setForm({ ...form, [key]: [...form[key], item] });

  const updateItem = (key, index, field, value) => {
    const updated = [...form[key]];
    updated[index][field] = value;
    setForm({ ...form, [key]: updated });
  };

  const removeItem = (key, index) => {
    const updated = [...form[key]];
    updated.splice(index, 1);
    setForm({ ...form, [key]: updated });
  };

  const saveData = async () => {
    try {
      setLoading(true);
      await api.post("/personal-loan", form);
      alert("Personal Loan Page Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  // Reusable Component for Section Headers
  const SectionHeader = ({ icon: Icon, title, subtitle }) => (
    <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-4">
      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
        <Icon size={24} />
      </div>
      <div>
        <h2 className="text-xl font-black text-slate-800 tracking-tight">{title}</h2>
        <p className="text-sm text-slate-500 font-medium">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 mb-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Personal Loan <span className="text-indigo-600">Editor</span></h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Content Management System</p>
          </div>
          <button
            onClick={saveData}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? <span className="animate-pulse">Saving...</span> : <><Save size={18} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* ================= HERO SECTION ================= */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <SectionHeader icon={Layout} title="Hero Section" subtitle="The first thing users see on the page." />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Badge Text</label>
              <input className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Ex: Best Interest Rates" value={form.hero.badge} onChange={(e) => updateHero("badge", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Main Heading</label>
              <input className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Main Title" value={form.hero.heading} onChange={(e) => updateHero("heading", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Highlight Word</label>
              <input className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Indigo Colored Text" value={form.hero.highlight} onChange={(e) => updateHero("highlight", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Button Text</label>
              <input className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="Apply Now" value={form.hero.ctaText} onChange={(e) => updateHero("ctaText", e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1 flex items-center gap-2"><ImageIcon size={14}/> Hero Image URL</label>
              <input className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium" placeholder="https://image-link.com" value={form.hero.image} onChange={(e) => updateHero("image", e.target.value)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Hero Description</label>
              <textarea className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-indigo-500/20 font-medium h-32 resize-none" placeholder="Short intro about the loan..." value={form.hero.description} onChange={(e) => updateHero("description", e.target.value)} />
            </div>
          </div>
        </section>

        {/* ================= PURPOSES ================= */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <SectionHeader icon={Target} title="Loan Purposes" subtitle="Visual cards showing what the loan covers." />
          <div className="space-y-4">
            {form.purposes.map((p, i) => (
              <div key={i} className="group grid md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-2xl relative">
                <input className="bg-white p-3 rounded-lg border-none text-sm font-bold outline-none" placeholder="Title" value={p.title} onChange={(e) => updateItem("purposes", i, "title", e.target.value)} />
                <input className="bg-white p-3 rounded-lg border-none text-sm outline-none" placeholder="Icon Name" value={p.icon} onChange={(e) => updateItem("purposes", i, "icon", e.target.value)} />
                <input className="bg-white p-3 rounded-lg border-none text-sm outline-none" placeholder="Text Color (Hex)" value={p.color} onChange={(e) => updateItem("purposes", i, "color", e.target.value)} />
                <div className="flex gap-2">
                  <input className="flex-1 bg-white p-3 rounded-lg border-none text-sm outline-none" placeholder="BG Color" value={p.bg} onChange={(e) => updateItem("purposes", i, "bg", e.target.value)} />
                  <button className="bg-red-50 text-red-500 p-3 rounded-lg hover:bg-red-500 hover:text-white transition-colors" onClick={() => removeItem("purposes", i)}><Trash2 size={18}/></button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all" onClick={() => addItem("purposes", { title: "", icon: "", color: "", bg: "" })}>
            <Plus size={18} /> Add New Purpose
          </button>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
          <SectionHeader icon={Sparkles} title="Loan Benefits" subtitle="Why customers should choose your service." />
          <div className="space-y-4">
            {form.benefits.map((b, i) => (
              <div key={i} className="p-6 border border-slate-100 rounded-2xl space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input className="w-full p-3 bg-slate-50 rounded-xl border-none outline-none font-bold" placeholder="Benefit Title" value={b.title} onChange={(e) => updateItem("benefits", i, "title", e.target.value)} />
                  <input className="w-full p-3 bg-slate-50 rounded-xl border-none outline-none" placeholder="Lucide Icon Name" value={b.icon} onChange={(e) => updateItem("benefits", i, "icon", e.target.value)} />
                </div>
                <div className="flex gap-3">
                  <textarea className="flex-1 p-3 bg-slate-50 rounded-xl border-none outline-none h-20 resize-none text-sm" placeholder="Description" value={b.desc} onChange={(e) => updateItem("benefits", i, "desc", e.target.value)} />
                  <button className="self-end bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-colors" onClick={() => removeItem("benefits", i)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all" onClick={() => addItem("benefits", { title: "", icon: "", desc: "" })}>
            <Plus size={18} /> Add Benefit Card
          </button>
        </section>

        <div className="grid md:grid-cols-2 gap-10">
          {/* ================= ELIGIBILITY ================= */}
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <SectionHeader icon={CheckCircle} title="Eligibility" subtitle="Qualifying criteria." />
            <input className="w-full p-4 bg-slate-50 rounded-xl border-none outline-none font-black mb-6" placeholder="Eligibility Title" value={form.eligibility.title} onChange={(e) => setForm({ ...form, eligibility: { ...form.eligibility, title: e.target.value } })} />
            <div className="space-y-3">
              {form.eligibility.points.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input className="flex-1 p-3 bg-slate-50 rounded-xl border-none outline-none text-sm font-medium" placeholder="Criteria Point" value={p} onChange={(e) => {
                      const pts = [...form.eligibility.points];
                      pts[i] = e.target.value;
                      setForm({ ...form, eligibility: { ...form.eligibility, points: pts } });
                    }} />
                  <button className="text-slate-300 hover:text-red-500 px-2" onClick={() => {
                      const pts = [...form.eligibility.points];
                      pts.splice(i, 1);
                      setForm({ ...form, eligibility: { ...form.eligibility, points: pts } });
                    }}><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs font-black uppercase text-indigo-600 tracking-tighter hover:underline" onClick={() => setForm({ ...form, eligibility: { ...form.eligibility, points: [...form.eligibility.points, ""] } })}>+ Add Requirement</button>
          </section>

          {/* ================= DOCUMENTS ================= */}
          <section className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <SectionHeader icon={FileText} title="Documents" subtitle="Paperwork needed." />
            <div className="space-y-3">
              {form.documents.map((d, i) => (
                <div key={i} className="flex gap-2 bg-slate-50 p-2 rounded-xl">
                  <input className="w-1/3 p-2 bg-white rounded-lg border-none text-xs font-bold outline-none" placeholder="Type" value={d.category} onChange={(e) => updateItem("documents", i, "category", e.target.value)} />
                  <input className="flex-1 p-2 bg-white rounded-lg border-none text-xs outline-none" placeholder="Items" value={d.value} onChange={(e) => updateItem("documents", i, "value", e.target.value)} />
                  <button className="text-red-400 hover:text-red-600 px-2" onClick={() => removeItem("documents", i)}><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs font-black uppercase text-indigo-600 tracking-tighter hover:underline" onClick={() => addItem("documents", { category: "", value: "" })}>+ Add Document Type</button>
          </section>
        </div>
      </div>
    </div>
  );
}