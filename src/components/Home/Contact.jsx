import { useState } from "react";
import { Mail, Phone, MapPin, Send, User, Smartphone, Clock, ChevronDown } from "lucide-react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service) {
      alert("Name, Phone and Service are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/inquiries`,
        form
      );

      if (res.data?.success) {
        alert("Inquiry sent successfully! We will contact you soon.");
        setForm({ name: "", phone: "", email: "", service: "", message: "" });
      } else {
        alert(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-[#F9FAFB] py-16 lg:py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[3px] rounded-full mb-4">
            Contact Hub
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-dark leading-tight">
            Let’s Scale Your <span className="text-primary italic">Financial Future.</span>
          </h2>
          <p className="mt-4 text-gray-500 font-medium text-lg">
            Have questions about loans? Our experts usually respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-4">
            <div className="bg-dark rounded-[48px] p-10 text-white h-full relative overflow-hidden shadow-2xl shadow-dark/20">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Send size={120} />
              </div>

              <h4 className="text-3xl font-black mb-10 relative z-10">Reach Out <br />Directly.</h4>

              <div className="space-y-10 relative z-10">
                {[
                  {
                    icon: Phone,
                    title: "Call Anytime",
                    value: "+91 88871 41052",
                    link: "tel:8887141052",
                    color: "bg-blue-500/20"
                  },
                  {
                    icon: Mail,
                    title: "Official Email",
                    value: "info@cashpro.co.in",
                    link: "mailto:info@cashpro.co.in",
                    color: "bg-primary/20"
                  },
                  {
                    icon: MapPin,
                    title: "Main Office",
                    value: "Rathyatra - Mahmoorganj Rd, Varanasi",
                    link: "https://maps.google.com",
                    color: "bg-emerald-500/20"
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    value: "Mon - Sat: 10:00 AM - 07:00 PM",
                    color: "bg-orange-500/20"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform`}>
                      <item.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mb-1">
                        {item.title}
                      </p>
                      {item.link ? (
                        <a href={item.link} className="text-base font-bold hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-base font-bold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MODERN FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 lg:p-14 rounded-[48px] shadow-xl border border-gray-100 relative">
              <form onSubmit={submitHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* NAME */}
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[24px] outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Email Address (Optional)"
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[24px] outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
                    />
                  </div>

                  {/* PHONE */}
                  <div className="relative group md:col-span-2">
                    <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-[24px] outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-semibold"
                    />
                  </div>

                  {/* SERVICE */}
                  <div className="md:col-span-2 relative group">
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-6 py-5 bg-gray-50 border border-transparent rounded-[24px] outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-semibold appearance-none text-gray-500"
                    >
                      <option value="">Select Required Service *</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Machinery Loan">Machinery Loan</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Investment">Investment Advice</option>
                    </select>
                  </div>

                  {/* MESSAGE */}
                  <div className="md:col-span-2">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your requirements..."
                      className="w-full p-6 bg-gray-50 border border-transparent rounded-[24px] outline-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all font-semibold resize-none shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full py-5 bg-dark text-white font-black rounded-[24px] overflow-hidden transition-all hover:bg-primary active:scale-[0.98] disabled:bg-gray-200 shadow-xl shadow-dark/10"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3 text-lg">
                    {loading ? "Processing..." : "Submit Inquiry"}
                    {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* GOOGLE MAP - Cashpro Location Varanasi */}
        <div className="bg-white p-4 rounded-[48px] shadow-2xl border border-gray-100 h-[500px] overflow-hidden group">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.8157771746215!2d82.9868729759451!3d25.308705926527584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e330058ec451b%3A0x6b80172e2764ec5b!2sCashpro%20Financial%20Services!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full rounded-[36px] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
};

export default Contact;