import { useEffect, useState } from "react";
import {
  fetchTestimonials,
  createTestimonial,
  deleteTestimonial,
} from "../../api/heroApi.js";
import { 
  User, Briefcase, Star, MessageSquare, Tag, 
  ImagePlus, Trash2, LayoutGrid, Plus, Loader2, Upload, Globe 
} from "lucide-react";

export default function TestimonialsManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    tag: "",
    image: "",
    file: null,
  });

  const load = async () => {
    const data = await fetchTestimonials();
    setList(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!form.name || !form.content) {
      alert("Name and Content are required");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "file" && v) fd.append("image", v);
        else if (k !== "file") fd.append(k, v);
      });

      await createTestimonial(fd);
      setForm({ name: "", role: "", content: "", rating: 5, tag: "", image: "", file: null });
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this testimonial?")) {
      await deleteTestimonial(id);
      load();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <MessageSquare size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-dark tracking-tight">Testimonials Manager</h1>
            <p className="text-gray-500 text-sm font-medium">Manage customer reviews and feedback</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Left Column: Add Form --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-10">
              <h3 className="text-lg font-bold text-dark mb-6 flex items-center">
                <Plus className="mr-2 text-primary" size={20} /> Add New Review
              </h3>

              <div className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    placeholder="Customer Name" 
                    value={form.name}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                  />
                </div>

                {/* Role */}
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    placeholder="Designation (e.g. CEO, Developer)" 
                    value={form.role}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    onChange={(e)=>setForm({...form,role:e.target.value})}
                  />
                </div>

                {/* Content */}
                <div className="relative">
                  <textarea 
                    placeholder="Testimonial content..." 
                    value={form.content}
                    rows="3"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    onChange={(e)=>setForm({...form,content:e.target.value})}
                  />
                </div>

                {/* Rating & Tag */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Star className="absolute left-3 top-3.5 text-amber-400 fill-amber-400" size={16} />
                    <input 
                      type="number" max="5" min="1" 
                      value={form.rating}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all font-bold"
                      onChange={(e)=>setForm({...form,rating:e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input 
                      placeholder="Tag (e.g. Loan)" 
                      value={form.tag}
                      className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      onChange={(e)=>setForm({...form,tag:e.target.value})}
                    />
                  </div>
                </div>

                {/* Image Selection */}
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <Globe className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input 
                      placeholder="External Image URL" 
                      value={form.image}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                      onChange={(e)=>setForm({...form,image:e.target.value})}
                    />
                  </div>
                  
                  <label className="flex items-center justify-center w-full py-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all group">
                    <Upload className="text-gray-400 group-hover:text-primary mr-2" size={18} />
                    <span className="text-xs font-bold text-gray-500 truncate px-2">
                      {form.file ? form.file.name : "Or Upload File"}
                    </span>
                    <input 
                      type="file" className="hidden"
                      onChange={(e)=>setForm({...form,file:e.target.files[0]})}
                    />
                  </label>
                </div>

                <button 
                  onClick={submit}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-emerald-600 disabled:bg-gray-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center space-x-2 active:scale-95 mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Testimonial"}
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: List --- */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-6 flex items-center justify-between">
                <span>Active Testimonials</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">{list.length}</span>
              </h3>

              {list.length === 0 ? (
                <div className="py-20 text-center">
                  <LayoutGrid className="mx-auto text-gray-200 mb-4" size={48} />
                  <p className="text-gray-400 font-medium">No testimonials found yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {list.map((t) => (
                    <div key={t._id} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl relative group hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDelete(t._id)}
                        className="absolute top-4 right-4 p-2 bg-white text-red-500 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-start space-x-4">
                        <img 
                          src={t.image} 
                          alt={t.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                          onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + t.name }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-dark truncate leading-tight">{t.name}</h4>
                          <p className="text-xs text-primary font-bold mb-2 uppercase tracking-wide">{t.role || 'Client'}</p>
                          
                          <div className="flex space-x-0.5 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} size={12} 
                                className={`${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-500 text-xs italic leading-relaxed line-clamp-3">
                        "{t.content}"
                      </p>

                      {t.tag && (
                        <div className="mt-4 flex items-center">
                          <span className="px-3 py-1 bg-white text-gray-400 text-[10px] font-black rounded-lg border border-gray-100 uppercase tracking-tighter">
                            #{t.tag}
                          </span>
                        </div>
                      )}
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