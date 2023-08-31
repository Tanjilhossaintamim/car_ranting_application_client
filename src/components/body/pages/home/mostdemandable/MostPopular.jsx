import React, { useEffect } from "react";
import Image from "../../../../reuseable/Image";
import AddToCartBtn from "../../../../reuseable/AddToCartBtn";
import { useSelector } from "react-redux";
import ProductCard from "../../../../reuseable/ProductCard";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";

const MostPopular = ({ showToast }) => {
  const { cars } = useSelector((state) => state.car);
  const mostPopular = cars.length != 0 && cars[2];
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({ y: 0, opacity: 1, pointerEvents: "auto" });
    } else {
      animation.start({ y: "100vh", opacity: 0, pointerEvents: "none" });
    }
  }, [inView]);
  return (
    <section className="py-10 overflow-hidden" ref={ref}>
      <motion.div
        className="container py-6"
        animate={animation}
        transition={{
          type: "spring",
          delay: 0.5,
          duration: 1.5,
          stiffness: 110,
        }}
      >
        <div className="heading mb-10">
          <h1 className="text-3xl font-bold font-mono ">Most Popular Car</h1>
        </div>
        <ProductCard
          cars={cars.length != 0 ? cars.slice(1, 10) : []}
          showToast={showToast}
        />
        <Link to={"/shop"} className="flex justify-center items-center">
          <motion.button
            className="w-72 font-bold uppercase mx-auto rounded-lg py-3 px-5 bg-color-green-dark text-white"
            whileHover={{
              scale: 1.1,
              boxShadow:
                "rgba(0, 255, 3, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            }}
            whileTap={{ scale: 0.7 }}
          >
            View More
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default MostPopular;
