"use client";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ Login state
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-sky-600 font-semibold relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-sky-600 after:scale-x-100 after:transition-transform after:duration-300"
      : "text-gray-700 hover:text-sky-600 transition-colors duration-300 relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-sky-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

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
          {/* <span className="text-lg font-bold">Om Ladies Tailor Shop</span> */}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/work" className={navClass}>
            Work
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        {/* Call Now Button */}
        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => navigate('/login')}
            className="cursor-pointer px-4 py-2 rounded-lg bg-sky-500 text-white font-medium shadow-md transition-colors hover:bg-sky-600"
          >
            {isLoggedIn ? "Logout":"Login"}
          </motion.a>
          <motion.a
            href="tel:8305310168" // Ye line se call lagega
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-white border-t shadow-md px-6 py-4 flex flex-col gap-4"
        >
          <NavLink to="/" className={navClass} onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/work"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            Work
          </NavLink>
          <NavLink
            to="/contact"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
        </motion.nav>
      )}
    </header>
  );
}
