import { useEffect, useState } from "react";
import { fetchInquiries, updateInquiryStatus } from "../../api/heroApi";
import {
  Inbox,
  User,
  Mail,
  MessageSquare,
  Clock,
  ChevronDown,
  Filter,
  MailQuestion,
  Loader2,
  Phone,
} from "lucide-react";

export default function Inquiries() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
      LOAD INQUIRIES
  ================================ */
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchInquiries();
      
      // ✅ FIX: यहाँ चेक करना जरूरी है कि डेटा ऐरे है या ऑब्जेक्ट के अंदर ऐरे है
      // अगर API { inquiries: [...] } भेज रहा है तो res.inquiries लें, 
      // वरना अगर डायरेक्ट ऐरे है तो res लें।
      const dataArray = Array.isArray(res) ? res : (res?.inquiries || []);
      setList(dataArray);
      
    } catch (err) {
      console.error("Failed to load inquiries", err);
      setList([]); // Error होने पर खाली ऐरे सेट करें ताकि .map() एरर न दे
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  /* ===============================
      STATUS BADGE STYLE
  ================================ */
  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "read":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "replied":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Inbox size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-dark">
                Contact Inquiries
              </h1>
              <p className="text-gray-500 text-sm">
                Customer messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white px-4 py-2 rounded-xl border shadow-sm">
              <Filter size={16} className="text-gray-400 mr-2" />
              <span className="text-sm font-bold text-gray-600">
                Total: {Array.isArray(list) ? list.length : 0}
              </span>
            </div>

            <a
              href={`${import.meta.env.VITE_API_URL}/inquiries/download/excel`}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black rounded-xl shadow-lg transition-all"
            >
              Download Excel
            </a>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <Loader2 className="animate-spin text-primary mb-2" size={40} />
            <p className="text-gray-400 font-medium">
              Loading messages...
            </p>
          </div>
        ) : (!Array.isArray(list) || list.length === 0) ? (
          <div className="bg-white rounded-3xl p-20 text-center border shadow-sm">
            <MailQuestion className="mx-auto mb-4 text-gray-200" size={40} />
            <h3 className="text-lg font-bold text-dark">
              No inquiries yet
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {list.map((item) => (
              <div
                key={item._id}
                className={`bg-white rounded-2xl border-l-4 p-6 shadow-sm transition-all hover:shadow-md ${
                  item.status === "new"
                    ? "border-l-amber-500"
                    : item.status === "replied"
                    ? "border-l-emerald-500"
                    : "border-l-blue-500"
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* INFO */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap gap-6 items-center">
                      <div className="flex items-center gap-2 font-bold text-dark">
                        <User size={16} className="text-gray-400" /> {item.name}
                      </div>

                      {item.email && (
                        <a
                          href={`mailto:${item.email}`}
                          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors underline decoration-gray-300"
                        >
                          <Mail size={14} /> {item.email}
                        </a>
                      )}

                      <a
                        href={`tel:${item.phone}`}
                        className="flex items-center gap-2 text-sm font-bold text-dark hover:text-primary transition-colors"
                      >
                        <Phone size={14} /> {item.phone}
                      </a>

                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-wider ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>

                    {item.message && (
                      <div className="bg-gray-50 p-4 rounded-xl text-sm italic text-gray-600 border border-gray-100">
                        “{item.message}”
                      </div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="min-w-[180px]">
                    <div className="relative group">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateInquiryStatus(
                            item._id,
                            e.target.value
                          ).then(load)
                        }
                        className="w-full bg-gray-50 border border-gray-200 py-3 px-4 rounded-xl text-xs font-bold appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                      >
                        <option value="new">New</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:rotate-180 transition-transform pointer-events-none"
                      />
                    </div>
                  </div>
                </div>

                {/* TIME */}
                <div className="mt-4 pt-4 border-t border-gray-100 text-[10px] text-gray-400 uppercase font-bold tracking-widest flex items-center">
                  <Clock size={12} className="inline mr-1.5" />
                  {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}