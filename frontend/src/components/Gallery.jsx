import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  // ✅ Base URL for Render
  const BASE_URL = "https://tailor-shop-a5mn.onrender.com";

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/work-images`);
        setWorks(res.data);
      } catch (err) {
        console.error("Error fetching works:", err);
      }
    };
    fetchWorks();
  }, []);

  const handleSelect = (item) => {
    navigate("/selected-type", { state: { item } }); // 👈 pass selected work
  };

  return (
    <section className="container py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Work Gallery
      </h2>

      <div className="flex flex-wrap justify-center gap-10 mb-10">
        {works.map((item) => (
          <motion.div
            key={item._id}
            onClick={() => handleSelect(item)}
            className="w-24 h-24 rounded-full border-2 shadow-md cursor-pointer relative overflow-hidden flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${BASE_URL}/${item.sampleImage.replace(
                  /\\/g,
                  "/"
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(0.5px)", // small blur
                transform: "scale(1.1)", // zoom to hide blur edges
              }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text */}
            <span className="relative text-white font-semibold text-center px-2">
              {item.type}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;