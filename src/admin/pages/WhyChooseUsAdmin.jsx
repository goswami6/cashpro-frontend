import { useEffect, useState } from "react";
import axios from "axios";
import * as Icons from "lucide-react"; 
import { 
  Plus, Trash2, LayoutGrid, Type, AlignLeft, 
  SmilePlus, Palette, Loader2, Sparkles 
} from "lucide-react";

export default function WhyChooseUsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    icon: "",
    color: "",
  });

  const load = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/why-choose-us`
      );
      setItems(data || []);
    } catch (err) {
      console.error("Load Error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!form.title || !form.icon) return alert("Title and Icon are required");
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/why-choose-us`,
        form,
        { headers: { Authorization: `Bearer ${localStorage.token}` } }
      );
      setForm({ title: "", desc: "", icon: "", color: "" });
      load();
    } catch (err) {
      alert("Error adding item");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/why-choose-us/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.token}` },
    });
    load();
  };

 
  const IconPreview = ({ iconName }) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={24} /> : <Icons.HelpCircle size={24} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
            <LayoutGrid size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-dark tracking-tight">Why Choose Us</h1>
            <p className="text-gray-500 text-sm font-medium">Manage your service highlights and value propositions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Left Column: Add New Item --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 sticky top-10">
              <h3 className="text-lg font-bold text-dark mb-6 flex items-center">
                <SmilePlus className="mr-2 text-indigo-500" size={20} /> Add Feature
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <Type className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    placeholder="Feature Title" 
                    value={form.title}
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                    onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  />
                </div>

                <div className="relative">
                  <AlignLeft className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <textarea 
                    placeholder="Short Description" 
                    value={form.desc}
                    rows="2"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                    onChange={(e) => setForm({ ...form, desc: e.target.value })} 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Sparkles className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input 
                      placeholder="Icon (e.g. Shield)" 
                      value={form.icon}
                      className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none"
                      onChange={(e) => setForm({ ...form, icon: e.target.value })} 
                    />
                  </div>
                  <div className="relative">
                    <Palette className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input 
                      placeholder="Gradient Classes" 
                      value={form.color}
                      className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none"
                      onChange={(e) => setForm({ ...form, color: e.target.value })} 
                    />
                  </div>
                </div>

                <button 
                  onClick={submit} 
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2 active:scale-95 mt-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20}/> <span>Add Feature</span></>}
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: Items List --- */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 min-h-[400px]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-dark">Live Features ({items.length})</h3>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <LayoutGrid size={48} className="mb-4 opacity-20" />
                  <p className="font-medium">No highlights added yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((i) => (
                    <div key={i._id} className="group relative bg-gray-50 rounded-[28px] p-6 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                      
                      {/* Delete Action */}
                      <button 
                        onClick={() => deleteItem(i._id)}
                        className="absolute top-4 right-4 p-2.5 bg-white text-red-500 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${i.color || 'from-indigo-500 to-purple-500'} text-white shadow-lg`}>
                          <IconPreview iconName={i.icon} />
                        </div>
                        <div className="flex-1 pr-8">
                          <h4 className="text-md font-bold text-dark mb-1">{i.title}</h4>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {i.desc || "No description provided."}
                          </p>
                        </div>
                      </div>

                      {/* Info Badge */}
                      <div className="mt-4 pt-4 border-t border-gray-200/50 flex items-center justify-between">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Icon: {i.icon}</span>
                         <span className="text-[10px] font-medium text-indigo-500">Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}