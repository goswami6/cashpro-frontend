import { useState } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  const services = [
    { label: "Home Loan", to: "/home-loan" },
    { label: "Machinery Loan", to: "/machinery-loan" },
    { label: "Personal Loan", to: "/personal-loan" },
    { label: "Business Loan", to: "/business-loan" },
    { label: "Loan Against Property", to: "/loan-against-property" },
    { label: "School & Hospital Purchase", to: "/school-hospital-loan" },
    { label: "Industrial & Commercial Purchase", to: "/industrial-commercial-loan" },
    { label: "Corporate Funding", to: "/corporate-funding" },
  ];

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Testimonials", to: "/testimonials" },
    { label: "FAQ", to: "/faq" },
    { label: "Our Team", to: "/team" },
    { label: "Contact", to: "/contact" },
    { label: "Blog", to: "/blogs" },
  ];

  return (
    <header className="sticky top-0 z-[100] bg-[rgba(30,142,62,0.80)] backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        {/* LOGO CONTAINER - Attractive & Clean */}
        <Link to="/" className="relative group p-2">
          {/* Soft Background Glow */}
          <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full scale-50 group-hover:scale-110 transition-transform duration-500"></div>

          <img
            src={logo}
            alt="CashPro"
            /* drop-shadow  */
            className="relative z-10 h-12 lg:h-15 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-white/90">
          <Link to="/" className={`hover:text-white transition ${location.pathname === '/' ? 'text-white font-bold' : ''}`}>
            Home
          </Link>
          <Link to="/about" className="hover:text-white transition">About</Link>

          {/* DROPDOWN */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-white transition py-8">
              Our Services
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>

            <div className="absolute top-[80px] left-[-50px] w-72 bg-white text-dark rounded-2xl shadow-2xl 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="py-3">
                {services.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link key={link.label} to={link.to} className="hover:text-white transition">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white
            bg-white/10 border border-white/20 backdrop-blur-md transition-all duration-300
            hover:bg-white hover:text-primary hover:shadow-lg active:scale-95"
        >
          Get Loan
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden p-2 text-white bg-white/10 rounded-lg"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden fixed inset-x-0 top-20 bg-white shadow-2xl transition-all duration-300 overflow-hidden ${open ? 'max-h-screen opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 py-8 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
          <Link to="/" onClick={() => setOpen(false)} className="block py-3 text-lg font-bold text-gray-800">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block py-3 text-lg font-bold text-gray-800">About</Link>

          {/* Mobile Services Accordion */}
          <div className="py-2">
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full py-3 text-lg font-bold text-gray-800 border-b border-gray-50"
            >
              Our Services
              <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`mt-2 space-y-1 overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {services.map((s) => (
                <Link
                  key={s.label}
                  to={s.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {navLinks.slice(2).map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block py-3 text-lg font-bold text-gray-800 border-b border-gray-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 pb-10">
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full py-4 rounded-xl text-white font-black bg-[rgba(30,142,62,1)] shadow-xl"
            >
              Get Loan Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;