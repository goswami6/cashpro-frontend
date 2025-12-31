// src/App.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import HeroPage from "./pages/HeroPage";
import AboutPage from "./pages/AboutPage";
import TeamPage from "./pages/TeamPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import BlogPage from "./pages/BlogPage";

// Services
import HomeLoan from "./pages/services/HomeLoan";
import CarLoan from "./pages/services/CarLoan";
import PersonalLoan from "./pages/services/PersonalLoan";
import BusinessLoan from "./pages/services/BusinessLoan";
import LoanAgainstProperty from "./pages/services/LoanAgainstProperty";
import InstitutionalLoan from "./pages/services/InstitutionalLoan";
import CommercialIndustrialLoan from "./pages/services/CommercialIndustrialLoan";
import CorporateFunding from "./pages/services/CorporateFunding";

// Components
import Contact from "./components/Home/Contact";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import WhatsAppButton from "./components/WhatsAppButton";
import CallButton from "./components/CallButton";
import AdminRoutes from "./admin/auth/adminRoute";

/* ---------- USER LAYOUT ---------- */
const UserLayout = () => (
  <>
    <Header />
    <ScrollToTop />
    <main className="min-h-screen">
      <Outlet />
    </main>
    <Footer />
    <CallButton />
    <WhatsAppButton />
    <ScrollToTopButton />
  </>
);

const App = () => {
  return (
    <Routes>

      {/* ---------- USER ROUTES ---------- */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HeroPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blogs" element={<BlogPage />} />

        {/* SERVICES */}
        <Route path="/home-loan" element={<HomeLoan />} />
        <Route path="/machinery-loan" element={<CarLoan />} />
        <Route path="/personal-loan" element={<PersonalLoan />} />
        <Route path="/business-loan" element={<BusinessLoan />} />
        <Route path="/loan-against-property" element={<LoanAgainstProperty />} />
        <Route path="/school-hospital-loan" element={<InstitutionalLoan />} />
        <Route path="/industrial-commercial-loan" element={<CommercialIndustrialLoan />} />
        <Route path="/corporate-funding" element={<CorporateFunding />} />
      </Route>

      {/* ---------- ADMIN ROUTES (NO HEADER/FOOTER) ---------- */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* ---------- 404 ---------- */}
      <Route path="*" element={<div className="py-20 text-center">Page Not Found</div>} />

    </Routes>
  );
};

export default App;
