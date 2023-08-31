import React from "react";
import { motion } from "framer-motion";

const ShopBanner = () => {
  return (
    <section>
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 w-full h-60 flex justify-center items-center">
        <div className="container relative">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", duration: 1.5 }}
          >
            <h1 className="text-2xl lg:text-4xl text-white">
              # Choose Your Favorite Car
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
