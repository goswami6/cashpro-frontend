// src/components/AboutUs.jsx
import React from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";


const AboutUs = () => {
  // Animation Variants
  const fadeInRight = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const listItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section
      id="about"
      className="bg-white py-14 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ---------- CENTER HEADING ---------- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-primary mb-3">
            Who We Are
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-dark leading-tight tracking-tighter">
            Dependable & <span className="text-gray-400 italic">Trusted</span> <br /> Financial Partners
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* -------- CONTENT -------- */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
          >
            {/* Modern Headline */}
            <motion.div variants={listItem} className="space-y-4">
              <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-dark leading-tight tracking-tight">
                Navigating Financial Growth in a <br className="hidden lg:block" />
                <span className="relative inline-block text-primary">
                  Fast-Paced Economy.
                  <motion.span 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-[6px] bg-primary/20 -z-10 rounded-full"
                  />
                </span>
              </h4>
              <div className="w-16 h-1.5 bg-primary rounded-full"></div>
            </motion.div>

            {/* Strategic Subtext */}
            <motion.p variants={listItem} className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Whether it’s a sudden challenge or a golden expansion opportunity,
              at <span className="font-bold text-dark border-b-2 border-primary/30">CashPro</span>, we provide the
              strategic capital you need to move forward without friction.
            </motion.p>

            {/* Benefit-Driven List */}
            <motion.ul variants={staggerContainer} className="space-y-5">
              {[
                { title: "Entrepreneurs", desc: "Capital to fuel your startup or scale existing operations." },
                { title: "Home Owners", desc: "Unlock the value of your property for renovation or needs." },
                { title: "Growth Seekers", desc: "Education and personal loans tailored to your future goals." },
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  variants={listItem}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="mt-1 p-1 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-dark font-bold text-sm sm:text-base leading-none mb-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            {/* Trust Factor & CTA */}
            <motion.div variants={listItem} className="pt-6 border-t border-gray-100 flex items-center gap-4">
               <div className="hidden sm:block pt-3 pl-4 w-12 h-12 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white font-black italic">CP</div>
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed italic">
                Securing the right financial support is the bridge to your success. 
                Meet <span className="text-primary font-bold">CashPro</span> — your dependable loan partner.
              </p>
            </motion.div>
          </motion.div>

          {/* -------- IMAGE WITH CREATIVE FRAME -------- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative group"
          >
            {/* Background Decorative Boxes */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-dark/5 rounded-2xl -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="https://vtdi.net/wp-content/uploads/why-cooperate-in-corporate.jpg"
                alt="About Us"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                   <span className="font-bold">10+</span>
                </div>
                <div className="text-xs font-bold text-dark leading-tight uppercase">Years of <br /> Excellence</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;