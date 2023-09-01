import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProducts } from "../../../../../redux/shopSlice";
import ProductCard from "../../../../reuseable/ProductCard";
import Skeleton from "../../../../reuseable/Skeleton";
import { fetchCatagory } from "../../../../../redux/catagorySlice";
import { BASEURL } from "../../../../utils/BaseUrl";
import { Formik } from "formik";

const ShopProduct = ({ showToast }) => {
  // get data from redux store
  const { cars, is_loading, previousPage, nextpage, count } = useSelector(
    (state) => state.shop
  );

  const { catagories } = useSelector((state) => state.catagory);

  const dispatch = useDispatch();

  // fetch all car and car catagory from this hooks
  useEffect(() => {
    dispatch(fetchCatagory());
    dispatch(fetchShopProducts(`${BASEURL}/api/car/`));
  }, []);

  const GetNextPageProducts = () => {
    // this  function is working for fetch  pagination data-next page
    dispatch(fetchShopProducts(nextpage));
    window.scrollTo(0, 0);
  };

  const GetPreviousPageProducts = () => {
    // this  function is working for fetch  pagination data-previous page
    window.scrollTo(0, 0);

    dispatch(fetchShopProducts(previousPage));
  };

  ///////////////////////////////

  const getCategoriwiseCar = (id) => {
    // this function fecth catagory wise car
    dispatch(fetchShopProducts(`${BASEURL}/api/car/?catagory=${id}`));
  };

  const filterCarByPrice = (url) => {
    dispatch(fetchShopProducts(url));
  };
  return (
    <section className="py-32">
      <div className="container">
        {/* catagory dropdown  */}

        <div className="catagorydropdown mb-7 flex justify-between items-center">
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn m-1">
              Categories
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {catagories?.map((category) => {
                return (
                  <li
                    key={category.id}
                    onClick={() => getCategoriwiseCar(category.id)}
                  >
                    <span>{category.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* filter by price */}
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn m-1">
              Filter By Price
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li
                onClick={() =>
                  filterCarByPrice(
                    `${BASEURL}/api/car/?catagory=&price__gt=50000000&price__lt=`
                  )
                }
              >
                <span>price up to 5 core</span>
              </li>
              <li
                onClick={() =>
                  filterCarByPrice(
                    `${BASEURL}/api/car/?catagory=&price__gt=&price__lt=50000000`
                  )
                }
              >
                <span>price less then 5 core</span>
              </li>
            </ul>
          </div>
        </div>

        {/* product shorting dropdown */}

        {/* .................. */}

        {!is_loading ? (
          <>
            {cars.length == 0 ? (
              <h1>No Product Avilabel !</h1>
            ) : (
              <ProductCard
                cars={cars.length != 0 ? cars : []}
                showToast={showToast}
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
              {nextpage && (
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
          <div className="flex flex-col md:flex-row md:justify-between items-center">
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

export default ShopProduct;
