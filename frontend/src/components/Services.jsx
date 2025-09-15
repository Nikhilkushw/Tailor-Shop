"use client";
import { motion } from "framer-motion";
import { BorderBeam } from "../stylishComponents/BorderBeam";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Services() {
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  // Fetch services from backend
  const getServices = async () => {
    try {
      const response = await axios.get(
        "https://tailor-shop-1.onrender.com/api/services"
      );
      console.log("Services fetched:", response.data);

      // Adjust based on your API response shape
      setServiceData(response.data.services || response.data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServiceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <section className="container py-12">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
      >
        Our Services
      </motion.h2>

      {/* Loader / Empty / Data */}
      {loading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : serviceData.length === 0 ? (
        <p className="text-gray-500">No services available</p>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
          {serviceData.map((s, idx) => (
            <motion.div
              key={s._id || idx}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl border bg-white shadow-sm transition-all duration-300 overflow-hidden group hover:shadow-xl"
            >
              {/* BorderBeam on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <BorderBeam
                  size={120}
                  colorFrom="#7400ff"
                  colorTo="#9b41ff"
                  borderThickness={2}
                  glowIntensity={2}
                  beamBorderRadius={16}
                  pauseOnHover={true}
                  speedMultiplier={1.5}
                />
              </div>

              <div className="text-xl font-semibold text-sky-700">
                {s.heading}
              </div>
              <p className="text-gray-600 mt-2">{s.description}</p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
