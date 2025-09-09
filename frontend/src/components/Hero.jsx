"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomeImage from "../images/homeImages/tailor.jpg";

export default function Hero() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gradient-to-br from-sky-50 to-white border-b overflow-hidden">
      <div className="container grid md:grid-cols-2 items-center gap-8 py-12 md:py-20">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {/* Heading 1 */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            <span className="text-sky-600">Om Ladies Tailor Shop</span>
          </motion.h1>

          {/* Heading 2 */}
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-extrabold leading-tight"
          >
            Perfect Fit. Premium Fabric.{" "}
            <span className="text-sky-600">Bespoke Tailoring</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-600"
          >
            Suits, blouses, lehenga, sherwani, alterations—sab kuch ek hi jagah.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/work" className="btn btn-primary shadow-md">
                View Work
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="btn border shadow-sm">
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
        >
          <motion.img
            src={HomeImage}
            alt="Tailoring"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
