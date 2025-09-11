"use client";
import { motion } from "framer-motion";

export default function About() {
  // Fade up animation for sections
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-gradient-to-b from-pink-50 via-purple-50 to-white min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden">
      {/* Decorative floating shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-pink-200 rounded-full opacity-40 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-96 h-96 bg-purple-300 rounded-full opacity-30 animate-pulse blur-3xl"></div>

      <motion.div
        className="max-w-5xl bg-white shadow-2xl rounded-3xl p-10 md:p-16 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-700 mb-8 text-center">
          मैं पार्वती कुशवाह
        </h1>

        <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed text-center">
          मुझे सिलाई का <span className="font-semibold text-pink-600">30+ सालों का अनुभव</span> है। हर कपड़े को मैं <span className="font-semibold text-purple-600">बेहतरीन क्वालिटी</span>, <span className="font-semibold text-purple-600">परफेक्ट फिट</span> और <span className="font-semibold text-pink-600">समय पर डिलीवरी</span> के साथ तैयार करती हूँ।
        </p>

        <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed text-center">
          मैं खासतौर पर महिलाओं के लिए <span className="font-semibold text-pink-500">डिजाइनर कपड़े</span> बनाती हूँ। हर महिला के स्टाइल और पसंद को समझकर उसके लिए <span className="font-semibold text-purple-600">खास और खूबसूरत आउटफिट</span> तैयार करना मेरे लिए ज़रूरी है।
        </p>

        <p className="text-gray-700 text-lg md:text-xl mb-6 leading-relaxed text-center">
          मेरे स्टूडियो में <span className="font-semibold text-pink-500">हर चीज़ पर ध्यान</span> दिया जाता है – फैब्रिक, डिज़ाइन, फिटिंग और डिटेलिंग। चाहे कोई खास अवसर हो या रोज़मर्रा की ज़रूरत, हम हमेशा ऐसे कपड़े बनाते हैं जो पहनने वाली महिला को <span className="font-semibold text-purple-600">अत्मविश्वास और खूबसूरती</span> महसूस कराएँ।
        </p>

        <p className="text-gray-700 text-lg md:text-xl mb-10 leading-relaxed text-center">
          अगर आप चाहते हैं कि आपके कपड़े <span className="font-semibold text-pink-500">स्टाइलिश, आरामदायक और बिल्कुल फिट</span> हों, तो आप सही जगह पर हैं। मेरे लिए हर ग्राहक का संतोष और खुश रहना <span className="font-semibold text-purple-600">सबसे बड़ा इनाम</span> है।
        </p>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 10px 25px rgba(255,105,180,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-10 py-4 rounded-full shadow-xl transition-all"
          >
            संपर्क करें
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
