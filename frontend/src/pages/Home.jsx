"use client";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Offers from "../components/Offers";
import Gallery from "../components/Gallery";
import Map from "../components/Map";

export default function Home() {
  // Animation variants for reusability
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Hero />
      </motion.div>

      {/* Services Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Services />
      </motion.div>

      {/* Offers Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Offers />
      </motion.div>

      {/* Gallery Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <Gallery />
      </motion.div>

      {/* Map Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="container pb-12"
      >
        <Map />
      </motion.section>
    </>
  );
}
