import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  CalendarCheck,
  Settings,
  LogOut,
  ChevronLeft,
  MessageCircle,
  Users,
  Info,
  PenTool,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminSidebar({ open, setOpen }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [serviceOpen, setServiceOpen] = useState(false);

  /* ================= MENUS ================= */

  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, link: "/admin" },
    { name: "Enquiries", icon: <FileText size={18} />, link: "/admin/inquiries" },
    { name: "Add Banner", icon: <Image size={18} />, link: "/admin/heroslider" },
    { name: "Testimonials", icon: <MessageCircle size={18} />, link: "/admin/testimonials" },
    { name: "Add Team", icon: <Users size={18} />, link: "/admin/team" },
    { name: "Why Choose Us", icon: <CalendarCheck size={18} />, link: "/admin/why-choose-us" },
    { name: "About Us", icon: <Info size={18} />, link: "/admin/about" },
  ];

  const services = [
    { name: "Personal Loan", link: "/admin/services/personal-loan" },
    { name: "Business Loan", link: "/admin/services/business-loan" },
    { name: "Corporate Funding", link: "/admin/services/corporate-funding" },
    {
      name: "Loan Pages",
      children: [
        { name: "Home Loan", link: "/admin/services/loan/home-loan" },
        { name: "Machinary Loan Page", link: "/admin/services/loan/Machinary-loan" },
        { name: "Loan Against Property", link: "/admin/services/loan/loan-against-property" },
      ],
    },
  ];

  /* ================= AUTO OPEN SERVICES ================= */
  useEffect(() => {
    if (pathname.startsWith("/admin/services")) {
      setServiceOpen(true);
    }
  }, [pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const isServiceActive = pathname.startsWith("/admin/services");

  return (
    <>
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen z-[70] bg-white border-r shadow-xl
        transition-all duration-300 ${open ? "w-64" : "w-0 lg:w-20"} flex flex-col`}
      >
        {/* LOGO */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <h2 className={`font-black text-primary ${open ? "block" : "hidden lg:block"}`}>
            {open ? "CASHPRO" : "CP"}
          </h2>

          <button onClick={() => setOpen(!open)} className="p-2 rounded-xl hover:bg-gray-100">
            <ChevronLeft size={20} className={!open ? "rotate-180" : ""} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 mt-4 space-y-1 px-2 overflow-y-auto">

          {/* MAIN MENU */}
          {menu.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${pathname === item.link
                ? "bg-primary text-white font-bold"
                : "text-gray-600 hover:bg-gray-50"}`}
            >
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>
          ))}

          {/* SERVICES HEADER */}
          <button
            onClick={() => setServiceOpen(!serviceOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl
            ${isServiceActive ? "bg-primary/10 text-primary font-bold" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <div className="flex items-center gap-3">
              <Briefcase size={18} />
              {open && <span>Services</span>}
            </div>
            {open && <ChevronDown size={16} className={serviceOpen ? "rotate-180" : ""} />}
          </button>

          {/* SERVICES LIST */}
          {serviceOpen && open && (
            <div className="ml-8 mt-1 space-y-1">
              {services.map((item, i) =>
                item.children ? (
                  <div key={i}>
                    <p className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">
                      {item.name}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.link}
                        to={child.link}
                        className={`block px-4 py-2 rounded-lg text-sm
                        ${pathname === child.link
                          ? "bg-primary text-white font-bold"
                          : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.link}
                    to={item.link}
                    className={`block px-4 py-2 rounded-lg text-sm
                    ${pathname === item.link
                      ? "bg-primary text-white font-bold"
                      : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          )}

          {/* BLOG */}
          <Link
            to="/admin/add-blog"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl
            ${pathname === "/admin/add-blog"
              ? "bg-primary text-white font-bold"
              : "text-gray-600 hover:bg-gray-50"}`}
          >
            <PenTool size={18} />
            {open && <span>Add Blog</span>}
          </Link>

          {/* SETTINGS */}
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl
            ${pathname === "/admin/settings"
              ? "bg-primary text-white font-bold"
              : "text-gray-600 hover:bg-gray-50"}`}
          >
            <Settings size={18} />
            {open && <span>Settings</span>}
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="p-2 border-t">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold"
          >
            <LogOut size={18} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
