import axios from "axios";
import React from "react";
import { BsCartPlus } from "react-icons/bs";
import "react-toastify/dist/ReactToastify.css";
import { BASEURL } from "../utils/BaseUrl";
import { useDispatch } from "react-redux";
import { fetchShopingCartProductProduct } from "../../redux/shopingCartSlice";
const IconAddtoCartBtn = ({ carId, quantity, showToast }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    const cart_id = localStorage.getItem("cart_id");
    if (cart_id) {
      // add item in existing cart
      axios
        .post(`${BASEURL}/api/cart/${cart_id}/items/`, {
          car_id: carId,
          quantity: quantity,
        })
        .then((res) => {
          dispatch(fetchShopingCartProductProduct(cart_id));
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
            car_id: carId,
            quantity: quantity,
          })
          .then((res) => {
            showToast("Car Added To Your Cart");
            dispatch(fetchShopingCartProductProduct(cart_id));
          })
          .catch((err) => {
            showToast(`${err.message}`);
          });
      });
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center text-xl text-gray-400 w-9 h-9 rounded-full hover:bg-color-green-dark hover:text-white transition-all duration-300"
        title="ADD TO CART"
        onClick={addToCart}
      >
        <BsCartPlus />
      </div>
    </>
  );
};

export default IconAddtoCartBtn;
