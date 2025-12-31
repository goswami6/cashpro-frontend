import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronDown,
  Send,
} from "lucide-react";
import axios from "axios";

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  /* ===============================
     AUTO OPEN POPUP
  ================================ */
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  /* ===============================
     SUBMIT FORM (SAME AS CONTACT PAGE)
  ================================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // same validation logic
    if (!formData.name || !formData.phone || !formData.service) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/inquiries`,
        formData
      );

      alert("Thank you! We will contact you soon.");

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
      setIsOpen(false);
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-3 sm:px-4">
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl sm:rounded-[40px] shadow-2xl overflow-hidden"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all"
            >
              <X size={18} />
            </button>

            <div className="p-6 sm:p-10">
              {/* HEADER */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-dark">
                  Get a <span className="text-primary">Free</span> <br />
                  Consultation
                </h2>
                <p className="text-gray-500 mt-2 text-xs sm:text-sm font-medium">
                  Fill in the details and our expert will call you back.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* NAME */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* PHONE + EMAIL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      placeholder="Email (Optional)"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* SERVICE */}
                <div className="relative">
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full pl-4 pr-10 py-3.5 sm:py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-gray-600 appearance-none"
                  >
                    <option value="">Select Service *</option>
                    <option value="Personal Loan">Personal Loan</option>
                    <option value="Business Loan">Business Loan</option>
                    <option value="Machinery Loan">Machinery Loan</option>
                    <option value="Investment">Investment Advice</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 text-gray-400" size={16} />
                  <textarea
                    rows="3"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-dark text-white py-4 sm:py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary transition-all disabled:opacity-60"
                >
                  <Send size={18} />
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </form>

              <p className="text-center text-[10px] text-gray-400 mt-5 uppercase tracking-widest font-bold">
                🔒 Your data is safe with us
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;
