import React, { useEffect, useState } from "react";
import Image from "./Image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import IconAddtoCartBtn from "./IconAddtoCartBtn";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/BaseUrl";
import { useDispatch } from "react-redux";
import { setSelectedCar } from "../../redux/ownerProductSlice";

const ProductCard = ({ cars, showToast, isEditable }) => {
  const { ref, inView, effect } = useInView({ threshold: 0.2 });
  const animation = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView) {
      animation.start({ opacity: 1, x: 0 });
    } else {
      animation.start({ opacity: 0, x: "-100vw" });
    }
  }, [inView]);

  const SelectedCar = (car) => {
    dispatch(setSelectedCar(car));
  };
  return (
    <div
      className="flex justify-center lg:justify-between items-center flex-wrap  cursor-pointer"
      ref={ref}
    >
      {cars.map((item, i) => (
        <motion.div
          key={item.id}
          className="w-full md:w-1/2 lg:w-1/4 lg:mx-5  p-4 mb-9 rounded-md hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300"
        >
          <motion.div>
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.7 }}
              transition={{ duration: 0.1 }}
              onClick={() => {
                navigate(`/car-details/${item.title}/${item.id}`);
              }}
            >
              <Image src={`${BASEURL}${item.image}`} />
            </motion.div>
            <div>
              <h1
                className="text-xl font-bold py-3 text-gray-700"
                onClick={() => {
                  navigate(
                    `/car-details/${item.title.split("").join("")}/${item.id}`
                  );
                }}
              >
                {item.title}
              </h1>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">
                  &#2547; {item.price}
                </span>

                {isEditable ? (
                  <Link
                    to={`/editcar/${item.title.split(" ").join("")}/${item.id}`}
                    className="py-2 px-3 bg-blue-100"
                    onClick={() => SelectedCar(item)}
                  >
                    Edit
                  </Link>
                ) : (
                  <IconAddtoCartBtn
                    carId={item.id}
                    quantity={1}
                    showToast={showToast}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductCard;
