import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Search, Calendar, User, ArrowRight,
  Clock, X, Share2, Facebook, Twitter, Linkedin, MessageCircle
} from 'lucide-react';
import { getBlogs } from '../api/heroApi'; 

const categories = ["All", "Personal Loan", "Business", "Finance Tips", "Investment"];

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // 2. Filter और Search लॉजिक
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  
  useEffect(() => {
    if (selectedBlog) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedBlog]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* --- Hero Section --- */}
      <section className="relative bg-dark pt-32 pb-20 px-4 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1074&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-black/70 z-0"></div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Financial Wisdom</span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mt-4 mb-6 leading-tight">
              Latest Insights & <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Expert Advice</span>
            </h1>
          </motion.div>

          <div className="max-w-2xl mx-auto mt-12 relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for topics, loans, or tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-primary/50 transition-all backdrop-blur-sm"
            />
          </div>
        </div>
      </section>

      {/* --- Listing Section --- */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold">Loading insights...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((blog) => (
              <motion.article
                key={blog._id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase text-dark">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-gray-400 text-xs font-bold mb-4 uppercase tracking-widest">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1.5" /> 
                      {new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center"><Clock size={14} className="mr-1.5" /> {blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-black text-dark mb-4 leading-tight">{blog.title}</h3>
                  <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-3">{blog.excerpt}</p>

                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-400 uppercase">
                        {blog.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-dark">{blog.author}</span>
                    </div>

                    <button 
                      onClick={() => setSelectedBlog(blog)}
                      className="flex items-center text-primary font-black text-xs uppercase tracking-widest group/btn"
                    >
                      Read More
                      <ArrowRight size={14} className="ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-20 text-gray-400 font-medium">No blogs found in this category.</div>
        )}
      </section>

      {/* --- CONTENT MODAL --- */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)} className="absolute inset-0 bg-dark/80 backdrop-blur-sm" />
            
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl z-10"
            >
              <button onClick={() => setSelectedBlog(null)} className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all z-20">
                <X size={20} />
              </button>

              <div className="p-0">
                <img src={selectedBlog.image} className="w-full h-80 object-cover" alt="" />
                <div className="p-8 md:p-12">
                   <span className="text-primary font-bold uppercase text-[10px] tracking-widest">{selectedBlog.category}</span>
                  <h2 className="text-3xl md:text-4xl font-black text-dark mt-4 mb-6 leading-tight">{selectedBlog.title}</h2>
                  
                  <div className="flex items-center space-x-6 text-gray-400 text-xs font-bold mb-8 uppercase">
                    <span className="flex items-center"><Calendar size={14} className="mr-2" /> {new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center"><User size={14} className="mr-2" /> By {selectedBlog.author}</span>
                    <span className="flex items-center"><Clock size={14} className="mr-2" /> {selectedBlog.readTime}</span>
                  </div>
                  
                  <div className="text-gray-600 leading-relaxed font-medium text-lg whitespace-pre-line border-b border-gray-100 pb-12">
                    {selectedBlog.content}
                  </div>

                  {/* --- SOCIAL SHARE SECTION (NEW) --- */}
                  <div className="mt-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h4 className="text-dark font-black text-sm uppercase tracking-widest flex items-center gap-2">
                        <Share2 size={16} className="text-primary" /> Share Insight
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* WhatsApp */}
                      <a 
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(selectedBlog.title + " - " + window.location.href)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                      >
                        <MessageCircle size={18} fill="currentColor" />
                      </a>

                      {/* Facebook */}
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#1877F2]/10 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                      >
                        <Facebook size={18} fill="currentColor" />
                      </a>

                      {/* Twitter (X) */}
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(selectedBlog.title)}&url=${encodeURIComponent(window.location.href)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-black/5 text-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                      >
                        <Twitter size={18} fill="currentColor" />
                      </a>

                      {/* LinkedIn */}
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                        target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-all shadow-sm"
                      >
                        <Linkedin size={18} fill="currentColor" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;