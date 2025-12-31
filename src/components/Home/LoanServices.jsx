// src/components/FinancingSolutions.jsx
import React from "react";
import { motion } from "framer-motion"; // Import motion
import { ArrowRight } from "lucide-react";
import { FaUserTie, FaBuilding, FaCarSide, FaHome } from "react-icons/fa";
import { RiBarChartBoxLine, RiDatabase2Line } from "react-icons/ri";
import { FaIndustry } from "react-icons/fa";

const services = [
  {
    title: "Personal / Business Loan",
    icon: FaUserTie,
    link: "/personal-loan",
    bgImage: "url('https://img.freepik.com/free-photo/businesswomen-discussing-having-fun_53876-25153.jpg')",
    details: "Tailored financing for personal needs or business expansion.",
  },
  {
    title: "Corporate Funding",
    icon: RiBarChartBoxLine,
    link: "/corporate-funding",
    bgImage: "url('https://img.freepik.com/free-photo/business-people-making-pile-hands-teamwork-concept_1150-1821.jpg?semt=ais_hybrid&w=740&q=80')",
    details: "Scale your enterprise with strategic capital and funding solutions.",
  },
  {
    title: "Mortgage / Home Loans",
    icon: FaHome,
    link: "/home-loan",
    bgImage: "url('https://media.mahindrafinance.com/2024/02/What-is-a-Home-Loan.jpg')",
    details: "Achieve homeownership with competitive and flexible mortgage options.",
  },
  {
    title: "Commercial Property Purchase",
    icon: FaBuilding,
    link: "/school-hospital-loan",
    bgImage: "url('https://www.omaxe.com/blog/wp-content/uploads/2023/10/Commercial-Properties--1024x516.jpg')",
    details: "Secure financing for commercial real estate acquisition.",
  },
  {
    title: "Industrial Property Purchase",
    icon: RiDatabase2Line,
    link: "/industrial-commercial-loan",
    bgImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ527eRZsmMOJqimTRydc4FEPNkaSldbQEc8Q&s')",
    details: "Specialized loans for acquiring industrial land and property.",
  },
  {
    title: "Machinery Loan",
    icon: FaIndustry,
    link: "/machinery-loan",
    bgImage: "url('https://5.imimg.com/data5/SELLER/Default/2021/1/IH/VJ/XI/118436436/machinery-loan-service-500x500.jpg')",
    details: "Quick and easy financing for your new or used vehicle purchase.",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }, // Cards appear one by one
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FinancingSolutions = () => {
  return (
    <section className="bg-gray-50 py-14 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* ---------- HEADING WITH REVEAL ---------- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-dark mb-3">
            Our Key Financing Solutions
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted max-w-2xl mx-auto">
            Explore a range of tailored financial products designed to fuel your
            personal and business growth.
          </p>
        </motion.div>

        {/* ---------- GRID WITH STAGGER ANIMATION ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 sm:gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.a
                key={index}
                href={service.link}
                variants={cardVariants}
                whileHover={{ y: -8 }} // Clean hover lift
                className="group relative h-64 sm:h-72 w-full overflow-hidden rounded-xl shadow-lg transition-shadow duration-500 hover:shadow-2xl"
                style={{
                  backgroundImage: service.bgImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Background Zoom on Hover */}
                <motion.div 
                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                   style={{ backgroundImage: service.bgImage }}
                />

                {/* Overlay with color shift */}
                <div className="absolute inset-0 bg-dark/70 group-hover:bg-primary/80 transition-all duration-500" />

                {/* Content */}
                <div className="relative z-10 h-full p-5 flex flex-col text-white">

                  {/* Icon with scaling effect */}
                  <div className="flex-1 flex items-center justify-center">
                    <Icon className="w-9 h-9 sm:w-10 sm:h-10 text-accent transition-all duration-300 group-hover:text-white group-hover:scale-125" />
                  </div>

                  {/* Title */}
                  <h3 className="text-center text-base sm:text-lg font-heading font-semibold transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-4">
                    {service.title.split("/").map((line, i) => (
                      <span key={i} className="block">{line.trim()}</span>
                    ))}
                  </h3>

                  {/* Hover Detail Reveal */}
                  <div className="absolute inset-0 hidden lg:flex flex-col justify-center items-center text-center px-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <h4 className="text-lg font-heading font-bold mb-2">
                      {service.title.split("/")[0]}
                    </h4>
                    <p className="text-xs text-gray-100 mb-4 leading-tight">
                      {service.details}
                    </p>
                    <ArrowRight className="w-5 h-5 text-accent animate-pulse" />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FinancingSolutions;