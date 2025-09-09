import { motion } from "framer-motion";
import { Phone, MapPin, Clock } from "lucide-react"; // ✅ modern icons

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-r from-sky-50 to-white">
      {/* Main Footer Section */}
      <motion.div
        className="container py-10 grid gap-8 md:grid-cols-3 text-sm"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Shop Info */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="space-y-2"
        >
          <h3 className="font-semibold text-lg text-sky-600">Tailor Shop</h3>
          <p className="text-gray-600">
            Custom stitching, alterations & bespoke designs.
          </p>
        </motion.div>

        {/* Address */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="space-y-2"
        >
          <h3 className="font-semibold text-lg text-sky-600">Address</h3>
          <p className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-sky-500" />
            Vinay Nagar Sector - 04, Near BSNL Building, Gwalior, MP 474012
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Clock size={16} className="text-sky-500" />
            Open: Mon–Sat 10:00 AM–8:00 PM
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="space-y-2"
        >
          <h3 className="font-semibold text-lg text-sky-600">Contact</h3>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone size={16} className="text-sky-500" />
            Phone:{" "}
            <a
              href="tel:+918305310168"
              className="hover:text-sky-600 transition"
            >
              +91 8305310168
            </a>
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Phone size={16} className="text-green-600" />
            WhatsApp:{" "}
            <a
              href="https://wa.me/918305310168"
              target="_blank"
              rel="noreferrer"
              className="hover:text-green-600 transition"
            >
              +91 8305310168
            </a>
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="text-center py-4 text-xs text-gray-500 border-t"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        © {year} <span className="text-sky-600 font-semibold">Tailor Shop</span>.
        All rights reserved.
      </motion.div>
    </footer>
  );
}
