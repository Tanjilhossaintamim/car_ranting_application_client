import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Image from "../../../reuseable/Image";
import AddToCartBtn from "../../../reuseable/AddToCartBtn";
import Transition from "../../../reuseable/Transition";
import { BASEURL } from "../../../utils/BaseUrl";

const Details = ({ showToast }) => {
  const { carId } = useParams();
  const { data, is_loading, error } = useFetch(`car/${carId}/`);
  const [quantity, setQuantity] = useState(1);

  const handelInput = (e) => {
    setQuantity((prev) => e.target.value);
  };
  const increaseQuantity = () => {
    if (quantity == 5) {
      setQuantity(5);
    } else {
      setQuantity((perv) => perv + 1);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  document.title = data.title ? data.title : "Car Shop";

  return (
    <Transition>
      <section className="py-20 min-h-full">
        <div className="container flex justify-center flex-wrap">
          {!is_loading ? (
            <>
              <div className="w-full lg:w-1/2">
                <Image src={`${BASEURL}${data.image}`} />
              </div>
              <div className="w-full lg:w-1/2">
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <h6 className="text-xl font-bold text-color-green-dark py-4">
                  BDT {data.price}
                </h6>
                <p className="text-justify text-color-gray-dark">
                  {data.description}
                </p>

                <div className=" flex items-center">
                  <button
                    className="w-11 h-10 border outline-none font-bold"
                    onClick={decreaseQuantity}
                  >
                    {" "}
                    -
                  </button>
                  <input
                    type="number"
                    name=""
                    id=""
                    value={quantity}
                    onChange={handelInput}
                    disabled
                    className="w-14 h-10 py-1 text-center border outline-none font-bold"
                  />
                  <button
                    className="w-11 h-10 border outline-none font-bold"
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                  <div className="ml-5">
                    <AddToCartBtn
                      carid={data.id}
                      quantity={quantity}
                      showToast={showToast}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-96 skeleton"></div>
          )}
        </div>
      </section>
    </Transition>
  );
};

export default Details;
