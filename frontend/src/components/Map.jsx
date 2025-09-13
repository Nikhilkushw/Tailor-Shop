import React, { useState } from "react";
import { motion } from "framer-motion";

const Map = () => {
  const [customerAddress, setCustomerAddress] = useState("");

  // 👇 Shop ka permanent address
  const shopAddress =
    "vinay nagar sector 04, near bsnl building, gwalior, madhya pradesh";

  // Default map shop location pe dikhayega
  const [mapUrl, setMapUrl] = useState(
    `https://www.google.com/maps?q=${encodeURIComponent(shopAddress)}&output=embed`
  );

  const handleShowRoute = () => {
    if (!customerAddress.trim()) return;

    const origin = encodeURIComponent(customerAddress);
    const destination = encodeURIComponent(shopAddress);

    // Fallback directions (kyunki API key use nahi kar rahe)
    const fallbackUrl = `https://www.google.com/maps?q=${origin}+to+${destination}&output=embed`;

    setMapUrl(fallbackUrl);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-4 w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Customer Address Input */}
      <motion.input
        type="text"
        placeholder="Enter your address"
        value={customerAddress}
        onChange={(e) => setCustomerAddress(e.target.value)}
        className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />

      {/* Button with hover/tap animation */}
      <motion.button
        onClick={handleShowRoute}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Show Route to Shop
      </motion.button>

      {/* Google Map */}
      <motion.div
        className="w-full rounded-2xl overflow-hidden border h-72 mt-4 shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <iframe
          title="Tailor Shop Location"
          src={mapUrl}
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}

export default Map;