"use client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Home, User, Briefcase, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import DynamicNavigation from "../stylishComponents/DynamicNavigation"; // ✅ import

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Nav links array for DynamicNavigation
  const navLinks = [
    { id: "home", label: "Home", href: "/", icon: <Home size={16} /> },
    { id: "about", label: "About", href: "/about", icon: <User size={16} /> },
    { id: "work", label: "Work", href: "/work", icon: <Briefcase size={16} /> },
    { id: "contact", label: "Contact", href: "/contact", icon: <Phone size={16} /> },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <span className="inline-flex items-center justify-center w-16 h-9 rounded-2xl bg-sky-500 text-white text-xl font-bold shadow-md hover:bg-sky-600 transition-colors">
            ॐ
          </span>
        </Link>

        {/* Desktop Nav with DynamicNavigation */}
        <div className="hidden md:block">
          <DynamicNavigation
            links={navLinks}
            backgroundColor="#ffffff"
            textColor="#1e293b"
            highlightColor="#0ea5e9"
            glowIntensity={4}
            enableRipple
            onLinkClick={(id) =>
              navigate(navLinks.find((l) => l.id === id)?.href || "/")
            }
          />
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          {/* Login / Logout Button */}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md transition-colors hover:bg-red-600"
            >
              Logout
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white font-medium shadow-md transition-colors hover:bg-sky-600"
            >
              Login
            </motion.button>
          )}

          {/* ✅ Conditional: Admin ya Normal User */}
          {user?.role === "admin" ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admin-dashboard")}
              className="px-4 py-2 rounded-lg bg-purple-500 text-white font-medium shadow-md transition-colors hover:bg-purple-600"
            >
              Admin
            </motion.button>
          ) : (
            <motion.a
              href="tel:8305310168"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                if (!window.confirm("📞 Do you want to call 8305310168?")) {
                  e.preventDefault();
                }
              }}
              className="px-4 py-2 rounded-lg bg-sky-500 text-white font-medium shadow-md transition-colors hover:bg-sky-600"
            >
              Call Now
            </motion.a>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav (fallback without DynamicNavigation) */}
      {isOpen && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-white border-t shadow-md px-6 py-4 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                navigate(link.href);
                setIsOpen(false);
              }}
              className="text-gray-700 hover:text-sky-600 text-left transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}

          {/* ✅ Mobile Admin / Call Button */}
          {user?.role === "admin" ? (
            <button
              onClick={() => {
                navigate("/admin-dashboard");
                setIsOpen(false);
              }}
              className="text-purple-600 font-medium hover:underline text-left"
            >
              Admin Dashboard
            </button>
          ) : (
            <a
              href="tel:8305310168"
              onClick={(e) => {
                if (!window.confirm("📞 Do you want to call 8305310168?")) {
                  e.preventDefault();
                }
                setIsOpen(false);
              }}
              className="text-sky-600 font-medium hover:underline text-left"
            >
              Call Now
            </a>
          )}
        </motion.nav>
      )}
    </header>
  );
}
