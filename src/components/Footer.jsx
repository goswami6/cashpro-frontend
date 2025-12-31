// src/components/Footer.jsx
import React from "react";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { getSocialLinks } from "../api/heroApi";

const Footer = () => {
  const [links, setLinks] = useState({});

  useEffect(() => {
    getSocialLinks().then(setLinks);
  }, []);

  const socials = [
    { Icon: Facebook, link: links.facebook },
    { Icon: Instagram, link: links.instagram },
    { Icon: Linkedin, link: links.linkedin },
  ];
  const currentYear = new Date().getFullYear();

  const usefulLinks = [
    { name: "Home", to: "/" },
    { name: "About Us", to: "/about" },
    { name: "Our Services", to: "/business-loan" }, // Default service page or section
    { name: "Testimonials", to: "/testimonials" },
    { name: "FAQ's", to: "/faq" },
    { name: "Our Team", to: "/team" },
    { name: "Contact Us", to: "/contact" },
  ];

  const serviceLinks = [
    { name: "Home Loan", to: "/home-loan" },
    { name: "Car Loan", to: "/car-loan" },
    { name: "Personal Loan", to: "/personal-loan" },
    { name: "Business Loan", to: "/business-loan" },
    { name: "Loan Against Property", to: "/loan-against-property" },
    { name: "School & Hospital Purchase", to: "/school-hospital-loan" },
    { name: "Industrial & Commercial", to: "/industrial-commercial-loan" },
    { name: "Corporate Funding", to: "/corporate-funding" },
  ];

  return (
    <footer className="relative bg-[#0A0F1C] text-white overflow-hidden py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20">

      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-[100px] -mb-28 -mr-28 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ---------- MAIN GRID ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12 sm:mb-16">

          {/* ----- BRAND ----- */}
          <div className="space-y-6">
            <Link to="/" className="relative group p-2">
              {/* Soft Background Glow */}


              <img
                src={logo}
                alt="CashPro"
                /* drop-shadow सफेद रंग का ताकि लोगो के किनारों पर रोशनी दिखे */
                className="relative z-10 h-12 lg:h-15 w-auto object-contain transition-all"
              />
            </Link>

            <div className="flex items-start gap-4">
              <MapPin className="text-primary w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-gray-400 text-sm leading-relaxed">
                2nd Floor, Bhawani Complex, Rathyatra
                <br />
                - Mahmoorganj Rd, Jahumandi,
                <br />
                Varanasi, Uttar Pradesh 221010
              </p>
            </div>
          </div>

          {/* ----- USEFUL LINKS ----- */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-6 border-b-2 border-primary/30 pb-2 inline-block">
              Useful Links
            </h4>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:block sm:space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-primary transition-all duration-300 flex items-center gap-2 group text-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----- SERVICES ----- */}
          <div>
            <h4 className="text-base sm:text-lg font-bold mb-6 border-b-2 border-primary/30 pb-2 inline-block">
              Our Services
            </h4>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:block sm:space-y-4">
              {serviceLinks.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.to}
                    className="text-gray-400 hover:text-primary transition-all duration-300 flex items-center gap-2 group text-sm"
                  >
                    <ChevronRight className="w-4 h-4 text-primary opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ----- CONTACT + SOCIAL ----- */}
          <div className="space-y-6">
            <h4 className="text-base sm:text-lg font-bold border-b-2 border-primary/30 pb-2 inline-block">
              Connect With Us
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Phone className="text-primary w-5 h-5" />
                </div>
                <div className="flex flex-col text-sm">
                  <a href="tel:8887141052" className="text-gray-300 hover:text-primary font-bold transition-colors">
                    8887141052
                  </a>

                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                  <Mail className="text-primary w-5 h-5" />
                </div>
                <a
                  href="mailto:Info@cashpro.co.in"
                  className="text-gray-400 hover:text-primary text-xs sm:text-sm transition-colors break-all"
                >
                  Info@cashpro.co.in
                </a>
              </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 pt-4">
              {socials.map(
                (item, i) =>
                  item.link && (
                    <a
                      key={i}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center hover:bg-primary transition-all duration-500 group border border-white/10"
                    >
                      <item.Icon className="text-gray-400 group-hover:text-white w-5 h-5" />
                    </a>
                  )
              )}
            </div>
          </div>
        </div>

        {/* ---------- BOTTOM BAR ---------- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {currentYear}{" "}
            <span className="text-primary font-bold">CashPro</span>. All
            Rights Reserved
          </p>
          <p className="text-gray-500 text-xs sm:text-sm">
            Designed by{" "}
            <a
              href="https://jdstechnology.in/Default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold hover:underline"
            >
              JDS Technology
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;