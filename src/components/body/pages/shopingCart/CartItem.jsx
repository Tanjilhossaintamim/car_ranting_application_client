import React, { useState } from "react";
import { LuDelete } from "react-icons/lu";

const CartItem = ({
  cartItem: item,
  deleteCartItem,
  increaseQuantity,
  decreaseQuantity,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const increaseCartItemQuantity = (id) => {
    setQuantity((prev) => prev + 1);
    increaseQuantity(id, quantity + 1);
  };
  const decreaseCartItemQuantity = (id) => {
    setQuantity((prev) => prev - 1);
    decreaseQuantity(id, quantity - 1);
  };
  return (
    <tr key={item.id} className="p-5 border-b">
      <td className="p-5">
        <img src={item.car.image} alt="" className="w-10 h-10" />
      </td>
      <td className="p-5">{item.car.title.slice(0, 10)}</td>
      <td className="p-5">&#2547; {item.car.price}</td>
      {/* quantity  */}
      <td className="p-5">
        <button
          className="w-11 h-10 border outline-none font-bold"
          onClick={() => decreaseCartItemQuantity(item.id, item.quantity)}
        >
          {" "}
          -
        </button>
        <input
          type="number"
          name=""
          id=""
          value={quantity}
          disabled
          className="w-14 h-10 py-1 text-center border outline-none font-bold"
        />
        <button
          className="w-11 h-10 border outline-none font-bold"
          onClick={() => increaseCartItemQuantity(item.id, item.quantity)}
        >
          +
        </button>
      </td>
      <td className="p-5">&#2547; {item.total_price}</td>
      <td
        className="flex justify-center items-center p-5 cursor-pointer"
        onClick={() => deleteCartItem(item.id)}
      >
        <LuDelete color="red" />
      </td>
    </tr>
  );
};

export default CartItem;
