import { useEffect, useState } from "react";
import {
  fetchTeam,
  createTeamMember,
  deleteTeamMember,
} from "../../api/heroApi";
import { 
  Users, UserPlus, Linkedin, Twitter, Mail, 
  Trash2, Globe, Upload, Loader2, UserCircle, Briefcase, AlignLeft 
} from "lucide-react";

export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
    file: null,
    linkedin: "",
    twitter: "",
    email: "",
  });

  const load = async () => {
    const data = await fetchTeam();
    setTeam(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async () => {
    if (!form.name || !form.role) {
      alert("Name and Role are required");
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === "file" && v) fd.append("image", v);
        else if (k !== "file") fd.append(k, v);
      });

      await createTeamMember(fd);
      setForm({
        name: "", role: "", bio: "", image: "", 
        file: null, linkedin: "", twitter: "", email: "",
      });
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-dark tracking-tight">Team Management</h1>
            <p className="text-gray-500 text-sm font-medium">Add and manage your core team members</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Left Column: Add Member Form --- */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-10">
              <h3 className="text-lg font-bold text-dark mb-6 flex items-center">
                <UserPlus className="mr-2 text-primary" size={20} /> New Member
              </h3>

              <div className="space-y-4">
                {/* Basic Info */}
                <div className="relative">
                  <UserCircle className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    placeholder="Full Name" 
                    value={form.name}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    onChange={(e)=>setForm({...form,name:e.target.value})}
                  />
                </div>

                <div className="relative">
                  <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    placeholder="Position / Role" 
                    value={form.role}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    onChange={(e)=>setForm({...form,role:e.target.value})}
                  />
                </div>

                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <textarea 
                    placeholder="Short Biography" 
                    value={form.bio}
                    rows="2"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    onChange={(e)=>setForm({...form,bio:e.target.value})}
                  />
                </div>

                {/* Social Links Grid */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3.5 text-blue-600" size={16} />
                    <input placeholder="LinkedIn URL" value={form.linkedin} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none" onChange={(e)=>setForm({...form,linkedin:e.target.value})}/>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-red-500" size={16} />
                    <input placeholder="Email Address" value={form.email} className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none" onChange={(e)=>setForm({...form,email:e.target.value})}/>
                  </div>
                </div>

                {/* Media Section */}
                <div className="pt-2 space-y-3">
                  <div className="relative">
                    <Globe className="absolute left-3 top-3.5 text-gray-400" size={16} />
                    <input 
                      placeholder="Image URL (Optional)" 
                      value={form.image}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none"
                      onChange={(e)=>setForm({...form,image:e.target.value})}
                    />
                  </div>
                  <label className="flex items-center justify-center w-full py-4 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all group">
                    <Upload className="text-gray-400 group-hover:text-primary mr-2" size={18} />
                    <span className="text-xs font-bold text-gray-500 truncate px-2">
                      {form.file ? form.file.name : "Upload Photo"}
                    </span>
                    <input type="file" className="hidden" onChange={(e)=>setForm({...form,file:e.target.files[0]})} />
                  </label>
                </div>

                <button 
                  onClick={submit} 
                  disabled={loading}
                  className="w-full bg-primary hover:bg-emerald-600 disabled:bg-gray-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center space-x-2 active:scale-95 mt-4"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Add Member"}
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: Team Grid --- */}
          <div className="lg:col-span-8">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-6">Current Team ({team.length})</h3>

              {team.length === 0 ? (
                <div className="py-24 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-gray-200" size={40} />
                  </div>
                  <p className="text-gray-400 font-medium">No team members added yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {team.map((m) => (
                    <div key={m._id} className="group bg-gray-50 rounded-3xl p-5 border border-gray-100 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 relative">
                      
                      {/* Delete Button */}
                      <button 
                        onClick={() => { if(window.confirm("Delete member?")) deleteTeamMember(m._id).then(load) }}
                        className="absolute top-4 right-4 p-2 bg-white text-red-500 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={m.image} 
                            alt={m.name} 
                            className="w-20 h-20 rounded-2xl object-cover shadow-md border-2 border-white"
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${m.name}&background=random` }}
                          />
                          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-bold text-dark truncate leading-tight">{m.name}</h4>
                          <p className="text-primary font-bold text-xs uppercase tracking-wider mb-3">{m.role}</p>
                          
                          {/* Social Icons Strip */}
                          <div className="flex space-x-2">
                            {m.linkedin && <a href={m.linkedin} className="p-1.5 bg-white rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"><Linkedin size={14}/></a>}
                            {m.email && <a href={`mailto:${m.email}`} className="p-1.5 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"><Mail size={14}/></a>}
                            {m.twitter && <a href={m.twitter} className="p-1.5 bg-white rounded-lg text-sky-400 hover:bg-sky-400 hover:text-white transition-colors"><Twitter size={14}/></a>}
                          </div>
                        </div>
                      </div>

                      {m.bio && (
                        <p className="mt-4 text-gray-500 text-xs leading-relaxed line-clamp-2 italic">
                          "{m.bio}"
                        </p>
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