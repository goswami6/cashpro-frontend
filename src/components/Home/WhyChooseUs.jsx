import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import axios from 'axios';
import * as Icons from 'lucide-react'; 
import { ShieldCheck, TrendingUp, Loader2 } from 'lucide-react';

const WhyChooseUs = () => {
  const [usps, setUsps] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Backend ---
  const loadData = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/why-choose-us`);
      setUsps(data || []);
    } catch (err) {
      console.error("Error fetching WhyChooseUs data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // --- Dynamic Icon Component ---
  const DynamicIcon = ({ iconName, className }) => {
    const IconComponent = Icons[iconName];

    return IconComponent ? <IconComponent className={className} /> : <Icons.Shield className={className} />;
  };

  return (
    <section className="lg:py-24 py-16 bg-[#f8fafc] relative overflow-hidden">

      {/* --- Background Decorative Elements --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto py-16 sm:py-18 lg:py-12 px-4 sm:px-6 lg:px-15 relative z-10">

        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
            <ShieldCheck className="w-4 h-4" />
            <span className="uppercase tracking-wider">The CashPro Edge</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-heading font-black text-dark tracking-tight leading-[1.1]">
            Why Smart People <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              Choose CashPro
            </span>
          </h2>
          <p className="mt-6 text-xl text-gray-500 max-w-2xl mx-auto font-medium">
            We don't just provide loans; we provide a bridge to your financial aspirations with speed and clarity.
          </p>
        </motion.div>

        {/* --- Modern USP Grid --- */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {usps.map((usp, index) => (
              <motion.div
                key={usp._id || index}
                variants={cardVariants}
                whileHover={{ y: -12 }}
                className="group relative p-1 rounded-3xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-transparent rounded-3xl opacity-50 group-hover:from-primary/50 group-hover:to-emerald-400/50 transition-all duration-500"></div>

                <div className="relative bg-white p-10 rounded-[calc(1.5rem-1px)] h-full shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col items-start transition-all duration-500 group-hover:shadow-[0_20px_50px_-20px_rgba(30,142,62,0.25)]">

                  {/* Dynamic Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${usp.color || 'from-primary/20 to-primary/40'} p-[1px] mb-8 transform group-hover:rotate-[15deg] transition-all duration-500 shadow-lg`}>
                    <div className="w-full h-full bg-white rounded-[calc(1rem-1px)] flex items-center justify-center">
                      <DynamicIcon
                        iconName={usp.icon}
                        className="w-8 h-8 text-dark group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <h4 className="text-2xl font-black text-dark mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {usp.title}
                  </h4>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {usp.desc}
                  </p>

                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 transition-all duration-500 group-hover:translate-x-[-10px]">
                    <DynamicIcon iconName={usp.icon} className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* --- Premium CTA Card --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 relative group overflow-hidden rounded-[40px] p-[1px] bg-gradient-to-r from-dark via-primary to-dark"
        >
          <div className="bg-dark/95 backdrop-blur-xl p-8 lg:p-12 rounded-[39px] relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white/10 p-6 rounded-3xl backdrop-blur-md"
              >
                <TrendingUp className="w-12 h-12 text-primary" />
              </motion.div>

              <div className="flex-grow text-center lg:text-left">
                <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
                  Comprehensive Assistance
                </h3>
                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {['Personal Loans', 'Business Loans', 'Education', 'Medical'].map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(30,142,62,0.3)' }}
                      className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-gray-300 cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="relative inline-block px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-lg hover:shadow-primary/40 transition-all duration-300"
                >
                  Contact Now
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseUs;