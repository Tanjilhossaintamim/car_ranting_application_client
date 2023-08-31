import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BASEURL } from "../utils/BaseUrl";

const AddToCartBtn = ({ carid, quantity, showToast }) => {
  const addToCart = () => {
    const cart_id = localStorage.getItem("cart_id");
    if (cart_id) {
      // add item in existing cart
      axios
        .post(`${BASEURL}/api/cart/${cart_id}/items/`, {
          car_id: carid,
          quantity: 1,
        })
        .then((res) => {
          showToast("Car Added To Your Cart !");
        })
        .catch((err) => {
          showToast(`${err.message}`);
        });
    } else {
      axios.post(`${BASEURL}/api/cart/`, {}).then((res) => {
        localStorage.setItem("cart_id", res.data.id);
        axios
          .post(`${BASEURL}/api/cart/${res.data.id}/items/`, {
            car_id: carid,
            quantity: quantity,
          })
          .then((res) => showToast("Car Added To Your Cart"))
          .catch((err) => {
            showToast(`${err.message}`);
          });
      });
    }
  };
  return (
    <div>
      <motion.button
        onClick={addToCart}
        className="w-52 lg:w-72 font-bold uppercase rounded-lg py-3 px-5 bg-color-green-dark text-white my-4"
        whileHover={{
          scale: 1.1,
          boxShadow:
            "rgba(0, 255, 3, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        }}
        whileTap={{ scale: 0.7 }}
      >
        Add To Cart
      </motion.button>
    </div>
  );
};

export default AddToCartBtn;
