import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Lens } from "../stylishComponents/lens"; // 👈 Lens import

const SelectedType = () => {
  const location = useLocation();
  const { item } = location.state || {};
  const [selectedImg, setSelectedImg] = useState(null); // 👈 selected image

  if (!item) {
    return <p className="text-center mt-10">No type selected</p>;
  }

  return (
    <section className="container py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {item.type} Works
      </h2>

      {/* Image Modal with Lens Effect */}
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
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-10 right-0 bg-white text-black px-3 py-1 rounded-full shadow hover:bg-gray-200 transition z-50"
              >
                ✕
              </button>

              {/* Lens Image */}
              <Lens zoomFactor={2} lensSize={200} blurEdge maskShape="circle">
                <img
                  src={selectedImg}
                  alt="Large preview"
                  className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-xl object-contain"
                />
              </Lens>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of Images */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {item.items.map((work) => (
          <div
            key={work._id}
            className="border rounded-lg shadow p-4 bg-white cursor-pointer"
            onClick={() =>
              setSelectedImg(
                `http://localhost:5000/${work.image.replace(/\\/g, "/")}`
              )
            }
          >
            <img
              src={`http://localhost:5000/${work.image.replace(/\\/g, "/")}`}
              alt={work.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="font-semibold">{work.title}</h3>
            <p className="text-gray-600 text-sm">{work.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedType;
