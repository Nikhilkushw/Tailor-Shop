import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Gallery() {
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/work-images");
        setWorks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWorks();
  }, []);

  const handleSelect = (item) => {
    navigate("/selected-type", { state: { item } }); // 👈 data pass kar diya
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
            {/* Background Image with Blur */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(http://localhost:5000/${item.sampleImage.replace(
                  /\\/g,
                  "/"
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(0.5px)", // 👈 blur effect
                transform: "scale(1.1)", // thoda zoom to hide edges of blur
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
