import React, { useEffect } from "react";
import CompanyImage from "../../../../../assets/about_image.jpg";
import HouseImg from "../../../../../assets/transportation.png";
import Building from "../../../../../assets/parking.png";
import CarImg from "../../../../../assets/car.png";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const AboutCompany = () => {
  const { count } = useSelector((state) => state.car);
  const { ref, inView, entry } = useInView({ threshold: 0.2 });
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
      });
    } else {
      animation.start({
        opacity: 0,
        y: "100vh",
        pointerEvents: "none",
      });
    }
  }, [inView]);

  return (
    <section className="my-12 overflow-hidden" ref={ref}>
      <motion.div
        className="container flex flex-col md:flex-row justify-center md:space-x-10"
        animate={animation}
        transition={{ type: "spring", duration: 2 }}
      >
        <div className="w-full md:w-1/4">
          <img src={CompanyImage} alt="" width={"100%"} />
        </div>
        <div className="w-full pt-4 md:pt-0 md:w-1/2">
          <h1 className="text-2xl font-semibold text-black">About Company</h1>
          <h1 className="text-3xl lg:text-5xl font-bold text-black py-3">
            You start the engine and your adventure begins
          </h1>
          <p className="pt-10 text-justify leading-relaxed">
            Certain but she but shyness why cottage. Guy the put instrument sir
            entreaties affronting. Pretended exquisite see cordially the you.
            Weeks quiet do vexed or whose. Motionless if no to affronting
            imprudence no precaution. My indulged as disposal strongly attended.
          </p>
          <div className="flex space-x-10 md:space-x-16 pt-10">
            <div className="w-20 md:w-32">
              <img src={HouseImg} alt="" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-2xl md:text-5xl font-extrabold">
                  {inView && <CountUp start={0} end={count} duration={7} />}
                </span>
                <span className="capitalize text-slate-700 md:font-bold">
                  car <br />
                  Type
                </span>
              </div>
            </div>
            <div className="w-20 md:w-32">
              <img src={CarImg} alt="" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-2xl md:text-5xl font-extrabold">
                  {inView && <CountUp start={0} end={15} duration={7} />}
                </span>
                <span className="capitalize text-slate-700 md:font-bold">
                  &nbsp; Rental <br />
                  Outlets
                </span>
              </div>
            </div>
            <div className="w-20 md:w-32">
              <img src={Building} alt="" />
              <div className="flex justify-between items-center pt-2">
                <span className="text-2xl md:text-5xl font-extrabold">
                  {inView && <CountUp start={0} end={75} duration={7} />}
                </span>
                <span className="capitalize text-slate-700 md:font-bold">
                  Repair <br /> Shop
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutCompany;
