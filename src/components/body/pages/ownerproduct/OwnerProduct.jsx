import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerProducts } from "../../../../redux/ownerProductSlice";
import { BASEURL } from "../../../utils/BaseUrl";
import Skeleton from "../../../reuseable/Skeleton";
import ProductCard from "../../../reuseable/ProductCard";
import { Link } from "react-router-dom";

const ownerProduct = ({ showToast }) => {
  const { owner_cars, is_loading, nextPage, previousPage } = useSelector(
    (state) => state.ownerCar
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOwnerProducts(`${BASEURL}/api/ownercar/`));
  }, []);

  const GetNextPageProducts = () => {
    // this  function is working for fetch  pagination data-next page
    dispatch(getOwnerProducts(nextPage));
    window.scrollTo(0, 0);
  };

  const GetPreviousPageProducts = () => {
    // this  function is working for fetch  pagination data-previous page
    window.scrollTo(0, 0);

    dispatch(getOwnerProducts(previousPage));
  };
  document.title = "My Product";
  return (
    <section className="py-32">
      <div className="container">
        <div className="flex">
          <Link to={"/addcar"}>
            <button className="bg-color-green-dark text-white py-2 px-4">
              ADD CAR
            </button>
          </Link>
        </div>
        {!is_loading ? (
          <>
            {owner_cars.length == 0 ? (
              <h1>No Product Avilabel !</h1>
            ) : (
              <ProductCard
                cars={owner_cars.length != 0 ? owner_cars : []}
                showToast={showToast}
                isEditable={true}
              />
            )}

            <div className="flex justify-end space-x-7">
              {previousPage && (
                <button
                  className="bg-orange-700 py-2 px-4 text-lg text-white "
                  onClick={GetPreviousPageProducts}
                >
                  Previous Page
                </button>
              )}
              {nextPage && (
                <button
                  className="bg-color-green-dark py-2 px-4 text-lg text-white "
                  onClick={GetNextPageProducts}
                >
                  Next Page
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center md:flex-row md:justify-between items-center">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
    </section>
  );
};

export default ownerProduct;
