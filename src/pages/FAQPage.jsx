// src/pages/FAQPage.jsx
import React, { useState } from "react";
import {
  Plus,
  Minus,
  Search,
  MessageCircle,
  PhoneCall,
  HelpCircle,
} from "lucide-react";

const faqs = [
  {
    question: "What is the minimum credit score required for a business loan?",
    answer:
      "Generally, a credit score of 700 or above is preferred. However, we work with multiple banking partners and can often find solutions for scores starting from 650 depending on business turnover.",
    category: "General",
  },
  {
    question: "How long does the loan approval process take?",
    answer:
      "With our digital-first approach, initial approval can happen within 24-48 hours. The final disbursement typically takes 3 to 7 working days depending on the bank and document verification.",
    category: "Process",
  },
  {
    question: "Are there any hidden charges in your service?",
    answer:
      "Absolutely not. Transparency is our core value. All processing fees and charges are clearly mentioned in the bank's sanction letter. We do not charge any upfront hidden fees.",
    category: "Pricing",
  },
  {
    question: "Can I get a loan if I am self-employed?",
    answer:
      "Yes! We specialize in customized loan products for self-employed professionals, entrepreneurs, and MSMEs. You just need your ITR and bank statements for the last 12 months.",
    category: "General",
  },
  {
    question: "What documents are required for a Home Loan?",
    answer:
      "Common documents include PAN Card, Aadhaar Card, last 6 months' bank statement, 3 years' ITR, and property-related documents like the allotment letter or sale deed.",
    category: "Documents",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO + SEARCH ================= */}
      <section className="relative bg-gray-50 border-b border-gray-100 overflow-hidden py-14 sm:py-16 lg:py-20">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-5">
            <HelpCircle size={16} />
            <span className="text-xs font-black uppercase tracking-widest">
              Support Center
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black text-dark mb-6 tracking-tight">
            How can we <span className="text-primary">help you?</span>
          </h1>

          {/* Search */}
          <div className="max-w-xl sm:max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for questions (e.g. Interest rates, Documents)"
              className="w-full pl-14 pr-6 py-4 sm:py-5 bg-white border border-gray-200 rounded-[24px] shadow-lg focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-sm sm:text-base"
            />
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-14 sm:py-16 lg:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
              <HelpCircle size={16} />
              <span className="text-xs font-black uppercase tracking-widest">
                Support Center
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-dark leading-tight">
              Common <span className="text-primary">Questions</span>
              <br />
              Answered for You.
            </h2>

            <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md">
              Finding the right loan shouldn't be confusing. We've compiled the
              most common queries to help you move forward.
            </p>

            {/* Image */}
            <div className="relative max-w-sm">
              <div className="absolute -inset-4 bg-primary/10 rounded-[32px] blur-2xl" />
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://img.freepik.com/free-photo/businesswoman-call-center-office_1098-984.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Customer Support"
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* RIGHT FAQ ACCORDION */}
          <div className="lg:w-1/2 w-full">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border rounded-[28px] transition-all duration-500 overflow-hidden ${openIndex === index
                      ? "border-primary bg-primary/[0.02] shadow-xl"
                      : "border-gray-100 bg-white"
                    }`}
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? -1 : index)
                    }
                    className="w-full px-5 sm:px-6 py-5 sm:py-6 flex items-center justify-between text-left"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold ${openIndex === index ? "text-primary" : "text-dark"
                        }`}
                    >
                      {faq.question}
                    </span>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${openIndex === index
                          ? "bg-primary text-white rotate-180"
                          : "bg-gray-100 text-dark"
                        }`}
                    >
                      {openIndex === index ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </div>
                  </button>

                  <div
                    className={`px-5 sm:px-6 transition-all duration-500 ${openIndex === index
                        ? "max-h-[400px] pb-6 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                  >
                    <div className="h-[1px] bg-gray-100 mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SUPPORT CTA ================= */}
      <section className="pb-16 sm:pb-20 lg:pb-24 px-4">
        <div className="max-w-5xl mx-auto bg-dark rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

          <div className="text-center lg:text-left relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Can't find the answer you're looking for? Talk to our experts.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <a
              href="tel:+918887141052"
              className="flex items-center gap-3 bg-white text-dark px-6 py-3 rounded-2xl font-black hover:bg-primary hover:text-white transition-all"
            >
              <PhoneCall size={18} />
              Call Support
            </a>
            <a
              href="https://wa.me/918887141052"
              className="flex items-center gap-3 bg-emerald-500 text-white px-6 py-3 rounded-2xl font-black hover:bg-emerald-600 transition-all"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
