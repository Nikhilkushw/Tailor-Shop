"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Offers = () => {
  const [offersData, setOffersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getOffers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/offers"
      );
      console.log("Offers fetched:", response.data);

      // ✅ make sure we store the correct array
      setOffersData(response.data || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
      setOffersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="container py-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
      >
        Special Offers
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading offers...</p>
      ) : offersData.length === 0 ? (
        <p className="text-center text-gray-500">No offers available</p>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.25 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {offersData.map((o) => (
            <motion.div
              key={o._id}
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative p-6 rounded-2xl border shadow-md bg-gradient-to-br from-pink-50 via-white to-purple-50 transition-all duration-500 hover:shadow-2xl hover:border-pink-400/60"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 hover:opacity-20 blur-2xl transition duration-500 pointer-events-none"></div>

              <div className="relative text-xl font-semibold text-purple-700">
                {o.heading}
              </div>

              <p className="relative text-gray-700 mt-2 leading-relaxed">
                {o.description}
              </p>

              {o.validity && (
                <p className="relative inline-block mt-4 px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-md">
                  🎁 Valid till: {o.validity}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default Offers;