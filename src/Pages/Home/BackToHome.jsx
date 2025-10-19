import React from "react";
import { HiArrowUp } from "react-icons/hi";
import { motion } from "framer-motion";

const BackToHome = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex justify-center mb-8">
      <motion.button
        onClick={scrollToTop}
        className="bg-primary text-white p-4 rounded-full shadow-lg cursor-pointer"
        title="Back to Home"
        animate={{
          y: [0, -10, 0], // moves up and down
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        whileHover={{ scale: 1.1, y: -12 }}
      >
        <HiArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default BackToHome;
