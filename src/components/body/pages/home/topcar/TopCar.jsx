import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Image from "../../../../reuseable/Image";
import AddToCartBtn from "../../../../reuseable/AddToCartBtn";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BASEURL } from "../../../../utils/BaseUrl";

const TopCar = ({ showToast }) => {
  const { cars, is_loading } = useSelector((state) => state.car);
  const topcar = cars.length != 0 && cars[0];
  const { ref, inView, entry } = useInView({ threshold: 0.2 });
  const animation = useAnimation();
  const imageAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({ opacity: 1, x: 0 });
      imageAnimation.start({ x: 0 });
    } else {
      animation.start({ opacity: 0, x: "100vw" });
      imageAnimation.start({ x: "-100vw" });
    }
  }, [inView]);

  return (
    <section className="py-8">
      <div className="container py-6">
        {!is_loading ? (
          <>
            <div className="heading">
              <h1 className="text-3xl font-bold font-mono">Top Rated Car</h1>
            </div>
            <div
              className="wrapper flex flex-col lg:flex-row lg:justify-between items-center"
              ref={ref}
            >
              <motion.div
                className="left lg:w-1/2"
                animate={imageAnimation}
                whileHover={{ x: "-100px" }}
                transition={{ type: "spring", duration: 1.5 }}
              >
                <Image src={`${BASEURL}${topcar.image}`} />
              </motion.div>
              <motion.div
                className="right  lg:w-1/2"
                animate={animation}
                transition={{ type: "spring", duration: 1.2, delay: 0.5 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-700">
                  {topcar.title}
                </h1>
                <span className="text-2xl text-color-green-dark font-bold py-3 block">
                  &#2547; {topcar.price}
                </span>
                <p className="text-md text-gray-500 text-justify">
                  {topcar.description}
                </p>
                <AddToCartBtn
                  carid={topcar.id}
                  quantity={1}
                  showToast={showToast}
                />
              </motion.div>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center lg:flex-row lg:justify-between">
            <div className="w-full lg:w-1/2 h-96 skeleton"></div>
            <div className="w-full lg:w-1/2 h-96 skeleton"></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopCar;
