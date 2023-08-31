import React from "react";
import { motion } from "framer-motion";

const Transition = ({ children }) => {
  return (
    <>
      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        exit={{ x: "-100vw" }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Transition;
