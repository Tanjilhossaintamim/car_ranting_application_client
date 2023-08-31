import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  empty_carItem,
  fetchShopingCartProductProduct,
} from "../../../../redux/shopingCartSlice";
import Transition from "../../../reuseable/Transition";
import axios from "axios";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../reuseable/Spinner";
import { BASEURL } from "../../../utils/BaseUrl";

const ShopingCart = ({ showToast }) => {
  const navigate = useNavigate();
  const { cartItem } = useSelector((state) => state.shopingCart);
  const { token } = useSelector((state) => state.login);
  const [is_loading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const cartId = localStorage.getItem("cart_id");

  useEffect(() => {
    localStorage.removeItem("location");
    if (cartId) {
      dispatch(fetchShopingCartProductProduct(cartId));
    }
  }, []);
  // cart item delete functionality
  const deleteCartItem = (id) => {
    axios.delete(`${BASEURL}/api/cart/${cartId}/items/${id}`).then((res) => {
      dispatch(fetchShopingCartProductProduct(cartId));
      showToast("Car removed from your cart !");
    });
  };
  // cart item quantity decrease functionaliy

  const decreaseQuantity = (id, quantity) => {
    if (quantity == 0) {
      axios.delete(`${BASEURL}/api/cart/${cartId}/items/${id}/`).then((res) => {
        dispatch(fetchShopingCartProductProduct(cartId));

        showToast("Item Deleted !");
      });
    } else {
      axios
        .patch(`${BASEURL}/api/cart/${cartId}/items/${id}/`, {
          quantity: quantity,
        })
        .then((res) => {
          dispatch(fetchShopingCartProductProduct(cartId));
          showToast("Quantity decreased");
        });
    }
  };
  const increaseQuantity = (id, quantity) => {
    axios
      .patch(`${BASEURL}/api/cart/${cartId}/items/${id}/`, {
        quantity: quantity,
      })
      .then((res) => {
        dispatch(fetchShopingCartProductProduct(cartId));
        showToast("Quantity Increased");
      });
  };
  const submitOrder = () => {
    // this function willbe submit order
    setIsloading(true);
    if (!token) {
      // this part will save location and when ever user will login then he will be come here it is good user exprince
      localStorage.setItem("location", "/mycart");
      navigate("/login");
    } else {
      const header = {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      };
      axios
        .post(
          `${BASEURL}/api/order/`,
          {
            cart_id: localStorage.getItem("cart_id"),
          },
          header
        )
        .then((res) => {
          setIsloading(false);
          showToast("Order Placed Successfully !");
          localStorage.removeItem("cart_id");
          dispatch(empty_carItem());
        })
        .catch((err) => {
          setIsloading(false);
          showToast(err.response.data.error);
        });
    }
  };
  document.title = "Shoping Cart";

  return (
    <Transition>
      <section className="py-10 min-h-full overflow-scroll">
        <div className="container flex justify-center items-center">
          {!is_loading ? (
            <>
              {cartItem.length != 0 ? (
                <table border={1} className="text-center overflow-scroll  p-5">
                  <thead className="border-b">
                    <tr className="p-5">
                      <th className="p-5">Image</th>
                      <th className="p-5">Title</th>
                      <th className="p-5">Price</th>
                      <th className="p-5">Quantity</th>
                      <th className="p-5">Total Price</th>
                      <th className="p-5">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-color-gray-dark">
                    {cartItem?.items?.map((item) => {
                      return (
                        <CartItem
                          cartItem={item}
                          key={item.id}
                          deleteCartItem={deleteCartItem}
                          decreaseQuantity={decreaseQuantity}
                          increaseQuantity={increaseQuantity}
                        />
                      );
                    })}
                    <tr className="mt-4">
                      <td></td>
                      <td></td>
                      <td>SubTotal : &#2547; {cartItem.total_price}</td>
                      <td></td>
                      {cartItem?.items?.length !== 0 && (
                        <td className="">
                          <button
                            className="bg-color-green-dark text-white py-2 px-3 lg:py-2 lg:px-5 mt-3"
                            onClick={submitOrder}
                          >
                            Place Order
                          </button>
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              ) : (
                <h1 className="text-xl font-bold">Cart Is Empty</h1>
              )}
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </Transition>
  );
};

export default ShopingCart;
