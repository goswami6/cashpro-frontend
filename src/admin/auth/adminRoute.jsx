// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";


import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import AdminLayout from "../components/AdminLayout";
import HeroManager from "../pages/HeroBanner";
import TestimonialsManager from "../pages/TestimonialsManager";
import TeamManager from "../pages/TeamManager";
import Inquiries from "../pages/Inquiries";
import WhyChooseUsAdmin from "../pages/WhyChooseUsAdmin";
import AboutAdmin from "../pages/AboutAdmin";
import AddBlog from "../pages/AddBlog";
import Settings from "../pages/Settings";
import AdminPersonalLoan from "../pages/services/AdminPersonalLoan";
import AdminCorporateFunding from "../pages/services/AdminCorporateFunding";
import AdminBusinessLoan from "../pages/services/AdminBusinessLoan";
import AdminLoanPage from "../pages/services/AdminLoanPage";

// future pages (example)
// import Pages from "../admin/pages/Pages";
// import Bookings from "../admin/bookings/Bookings";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* ---------- ADMIN LOGIN (NO LAYOUT) ---------- */}
      <Route path="login" element={<Login />} />

      {/* ---------- PROTECTED ADMIN AREA ---------- */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="heroslider" element={<HeroManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="inquiries" element={<Inquiries />} />
           <Route path="why-choose-us" element={<WhyChooseUsAdmin />} />
           <Route path="about" element={<AboutAdmin />} />
           <Route path="add-blog" element={<AddBlog />} />
           <Route path="settings" element={<Settings />} />
           <Route path="services/personal-loan" element={<AdminPersonalLoan />} />
           <Route path="services/corporate-funding" element={<AdminCorporateFunding />} />
           <Route path="services/business-loan" element={<AdminBusinessLoan />} />
           <Route path="services/loan/:type" element={<AdminLoanPage key={window.location.pathname} />} />


        </Route>
      </Route>
    </Routes>
  );
}


//https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop