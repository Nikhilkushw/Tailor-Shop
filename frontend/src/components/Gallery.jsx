import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/work-images`;

const Gallery = () => {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all works
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await axios.get(API);
        setWorks(res.data);
      } catch (err) {
        console.error("Error fetching works:", err);
      }
    };
    fetchWorks();
  }, []);

  // ✅ Navigate to SelectedType
  const handleSelect = (item) => {
    navigate("/selected-type", { state: { item } });
  };

  return (
    <section className="container py-12">
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Work Gallery
      </h2>

      {/* Work Types - Circle Cards */}
      <div className="flex flex-wrap justify-center gap-10 mb-10">
        {works.map((item) => (
          <motion.div
            key={item._id}
            onClick={() => handleSelect(item)}
            className="w-28 h-28 rounded-full border-2 shadow-lg cursor-pointer relative overflow-hidden flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${item.sampleImage || ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Type Text */}
            <span className="relative text-white font-semibold text-center px-2">
              {item.type}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
