import { useState, useEffect } from "react";
import { createBlog, getBlogs, deleteBlog } from "../../api/heroApi"; 
import { ImagePlus, Send, Type, AlignLeft, User, Clock, Tag, Trash2, ExternalLink, Search } from "lucide-react";

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", category: "", author: "", readTime: "", imageUrl: "",
  });

  // Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (image) fd.append("image", image);

    try {
      await createBlog(fd);
      alert("✅ Blog added successfully!");
      setForm({ title: "", excerpt: "", content: "", category: "", author: "", readTime: "", imageUrl: "" });
      setImage(null);
      fetchBlogs(); // Refresh List
    } catch (err) {
      alert("❌ Error adding blog");
    } finally {
      setLoading(false);
    }
  };

  const removeHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } catch (err) {
        alert("❌ Failed to delete blog");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* --- FORM SECTION --- */}
        <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 p-8 md:p-12 border border-gray-100">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-dark tracking-tight">Create New <span className="text-primary">Blog</span></h2>
            <p className="text-gray-400 font-medium mt-2">Publish your latest financial insights.</p>
          </div>

          <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Blog Title" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative"><Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Category" value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} /></div>
                <div className="relative"><Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Read Time" value={form.readTime} onChange={(e)=>setForm({...form, readTime: e.target.value})} /></div>
              </div>

              <div className="relative">
                <AlignLeft className="absolute left-4 top-4 text-gray-400" size={18} />
                <textarea rows="3" className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none" placeholder="Short Excerpt" value={form.excerpt} onChange={(e)=>setForm({...form, excerpt: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6">
              <textarea rows="6" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium resize-none" placeholder="Full Content..." value={form.content} onChange={(e)=>setForm({...form, content: e.target.value})} required />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium" placeholder="Author" value={form.author} onChange={(e)=>setForm({...form, author: e.target.value})} /></div>
                <div className="relative flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 overflow-hidden">
                  <input type="file" className="text-xs text-gray-500 file:hidden cursor-pointer w-full" onChange={(e)=>setImage(e.target.files[0])} />
                </div>
              </div>

              <button disabled={loading} className="w-full bg-primary hover:bg-dark text-white font-black py-4 rounded-2xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-primary/25 disabled:opacity-50">
                <Send size={20} />
                <span>{loading ? "Publishing..." : "Publish Article"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* --- BLOG LIST SECTION --- */}
        <div className="bg-white rounded-[32px] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-dark">Existing Blogs</h3>
              <p className="text-gray-400 text-sm font-medium">Manage and remove published content</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Search blogs..." />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Blog Detail</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Author</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {blogs.length > 0 ? blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={blog.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <p className="font-bold text-dark text-sm line-clamp-1">{blog.title}</p>
                          <p className="text-gray-400 text-[10px] font-bold uppercase">{new Date(blog.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase">{blog.category}</span>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-gray-500">{blog.author}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-primary transition-colors"><ExternalLink size={18} /></button>
                        <button onClick={() => removeHandler(blog._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-8 py-10 text-center text-gray-400 font-medium">No blogs found. Start by adding one above.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddBlog;