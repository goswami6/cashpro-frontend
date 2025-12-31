import { useEffect, useState } from "react";
import {
  fetchHeroSlides,
  createHeroSlide,
  deleteHeroSlide,
} from "../../api/heroApi";
import { ImagePlus, Trash2, Globe, Upload, Loader2, LayoutGrid } from "lucide-react";

export default function HeroManager() {
  const [slides, setSlides] = useState([]);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------- LOAD SLIDES (Logic Unchanged) ---------- */
  const loadSlides = async () => {
    try {
      const data = await fetchHeroSlides();
      setSlides(data || []);
    } catch (err) {
      console.error("Failed to load slides", err);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  /* ---------- CREATE SLIDE (Logic Unchanged) ---------- */
  const submit = async () => {
    if (!file && !url) {
      alert("Please upload an image or enter a URL");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
        formData.append("folder", "hero");
      } else {
        formData.append("image", url);
      }

      await createHeroSlide(formData);
      setUrl("");
      setFile(null);
      loadSlides();
    } catch (err) {
      console.error("Failed to add slide", err);
      alert("Failed to add slide");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- DELETE SLIDE (Logic Unchanged) ---------- */
  const removeSlide = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteHeroSlide(id);
      loadSlides();
    } catch (err) {
      console.error("Failed to delete slide", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">

        {/* --- Header Section --- */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <LayoutGrid size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-dark tracking-tight">Hero Slider Manager</h1>
            <p className="text-gray-500 text-sm font-medium">Update and manage your home page banners</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- Left Column: Add New Form --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-10">
              <h3 className="text-lg font-bold text-dark mb-6 flex items-center">
                <ImagePlus className="mr-2 text-primary" size={20} /> Add New Banner
              </h3>

              <div className="space-y-5">
                {/* URL Input */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="https://..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="relative flex items-center justify-center py-2">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="px-3 text-[10px] font-bold text-gray-300 uppercase">OR</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Upload File</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="text-gray-400 group-hover:text-primary mb-2 transition-colors" size={24} />
                      <p className="text-xs text-gray-500 font-medium">
                        {file ? <span className="text-primary font-bold">{file.name}</span> : "Choose image file"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  onClick={submit}
                  disabled={loading}
                  className="w-full bg-primary hover:bg-emerald-600 disabled:bg-gray-300 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <><span>Add Banner</span></>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* --- Right Column: Active Slides List --- */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-dark mb-6">Active Banners ({slides.length})</h3>

              {slides.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="inline-flex p-5 bg-gray-50 rounded-full mb-4">
                    <LayoutGrid className="text-gray-300" size={40} />
                  </div>
                  <p className="text-gray-400 font-medium">No slides found. Add your first banner!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slides.map((s) => (
                    <div
                      key={s._id}
                      className="group relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all"
                    >
                      <div className="aspect-[16/9] w-full relative">
                        <img
                          src={
                            s.image.startsWith("http")
                              ? s.image
                              : `${import.meta.env.VITE_API_URL.replace("/api", "")}${s.image}`
                          }
                          alt="hero slide"
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => removeSlide(s._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400 uppercase truncate max-w-[150px]">ID: {s._id}</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <div className="w-2 h-2 rounded-full bg-emerald-500/30"></div>
                        </div>
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