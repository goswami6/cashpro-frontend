import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, Save, Globe } from "lucide-react"; // Icons added
import {
  getSocialLinks,
  updateSocialLinks,
} from "../../api/heroApi";

export default function Settings() {
  const [links, setLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getSocialLinks().then((data) =>
      setLinks({
        facebook: data?.facebook || "",
        instagram: data?.instagram || "",
        linkedin: data?.linkedin || "",
      })
    );
  }, []);

  const save = async () => {
    setIsSaving(true);
    try {
      await updateSocialLinks(links);
      alert("Social links updated successfully! 🎉");
    } catch (error) {
      alert("Failed to update links.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-dark flex items-center gap-3">
          <Globe className="text-primary" size={32} />
          Social <span className="text-primary">Connect</span>
        </h2>
        <p className="text-gray-500 mt-2 font-medium">
          Update your official social media profiles shown on the website.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-[32px] shadow-sm border border-gray-100 space-y-6">
        
        {/* Facebook Input */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Facebook Profile</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1877F2] transition-colors">
              <Facebook size={20} />
            </div>
            <input
              placeholder="https://facebook.com/your-page"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#1877F2]/30 focus:ring-4 focus:ring-[#1877F2]/5 transition-all font-medium text-dark"
              value={links.facebook}
              onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
            />
          </div>
        </div>

        {/* Instagram Input */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Instagram Profile</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E4405F] transition-colors">
              <Instagram size={20} />
            </div>
            <input
              placeholder="https://instagram.com/your-handle"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#E4405F]/30 focus:ring-4 focus:ring-[#E4405F]/5 transition-all font-medium text-dark"
              value={links.instagram}
              onChange={(e) => setLinks({ ...links, instagram: e.target.value })}
            />
          </div>
        </div>

        {/* LinkedIn Input */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">LinkedIn Profile</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0A66C2] transition-colors">
              <Linkedin size={20} />
            </div>
            <input
              placeholder="https://linkedin.com/in/your-profile"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#0A66C2]/30 focus:ring-4 focus:ring-[#0A66C2]/5 transition-all font-medium text-dark"
              value={links.linkedin}
              onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={save}
            disabled={isSaving}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 bg-dark text-white px-10 py-4 rounded-2xl font-black text-lg transition-all hover:bg-primary hover:shadow-xl hover:shadow-primary/20 active:scale-95 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSaving ? "Saving..." : <><Save size={20} /> Save Settings</>}
          </button>
        </div>
      </div>
    </div>
  );
}