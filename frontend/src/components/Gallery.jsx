import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import works from "../data/works";
import { Lens } from "../stylishComponents/lens";
import axios from "axios";

export default function Gallery({ limit }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const items = limit ? works.slice(0, limit) : works;

  const fetchGalleryData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cloth/gallery", {
        params: { type: "Pant" }, // send as query param
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  return (
    <section className="container py-12">
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        Work Gallery
      </motion.h2>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Close Button 👇 always above Lens */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-10 right-0 bg-white text-black px-3 py-1 rounded-full shadow hover:bg-gray-200 transition z-50"
              >
                ✕
              </button>

              {/* Lens effect image */}
              <Lens zoomFactor={2} lensSize={200} blurEdge maskShape="circle">
                <img
                  src={selectedImg}
                  alt="large view"
                  className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-xl object-contain"
                />
              </Lens>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((w, i) => (
          <motion.figure
            key={i}
            className="rounded-xl overflow-hidden border bg-white shadow-sm cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={w.image}
              onClick={() => setSelectedImg(w.image)}
              alt={w.title}
              className="w-full h-56 object-cover"
            />
            <figcaption className="p-3 text-sm text-gray-700 text-center">
              {w.title}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
