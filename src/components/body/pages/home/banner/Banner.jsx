import React, { useEffect } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import bannerImage from "../../../../../assets/banner.png";

const Banner = () => {
  return (
    <section className="lg:min-h-[700px] py-20">
      <div className="container flex items-center">
        {/* left side  */}
        <motion.div
          className="flex flex-col"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
        >
          <span className="text-2xl lg:text-5xl font-semibold text-gray-700 font-mono">
            Find The Simplest Way
          </span>
          <span className="text-2xl lg:text-5xl font-semibold text-gray-700 font-mono py-4">
            to Drive Revolution
          </span>
          <span className="text-2xl lg:text-5xl font-semibold text-gray-700 font-mono">
            with Terra Auto.
          </span>
          <p className="py-5 text-color-gray font-bold">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae,
            nostrum. <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <motion.button
            className="w-52 lg:w-72 font-bold uppercase rounded-lg py-3 px-5 bg-color-green-dark text-white"
            whileHover={{
              scale: 1.1,
              boxShadow:
                "rgba(0, 255, 3, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
            whileTap={{ scale: 0.7 }}
          >
            Buy Your Car
          </motion.button>
        </motion.div>
        {/* right side  */}
        <AnimatePresence>
          <motion.div
            className="hidden lg:block"
            initial={{ x: "100vw", y: "-400px" }}
            animate={{ x: 0, y: 0 }}
            transition={{ type: "spring", duration: 1.5 }}
            whileHover={{ x: "5vw" }}
          >
            <div>
              <img src={bannerImage} alt="" width={"100%"} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Banner;
