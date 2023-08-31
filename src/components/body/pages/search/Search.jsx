import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "../../../reuseable/Skeleton";
import { useParams } from "react-router-dom";
import ProductCard from "../../../reuseable/ProductCard";
import { getSearchProducts } from "../../../../redux/searchProductSlice";

const Search = ({ showToast }) => {
  const { cars, is_loading, nextPage, previousPage } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();
  const { Carname } = useParams();

  const GetNextPageProducts = () => {
    // this  function is working for fetch  pagination data-next page
    dispatch(getSearchProducts(nextPage));
    // window.scrollTo(0, 0);
  };

  const GetPreviousPageProducts = () => {
    // this  function is working for fetch  pagination data-previous page
    window.scrollTo(0, 0);

    dispatch(getSearchProducts(previousPage));
  };
  return (
    <section className="py-32">
      <div className="container">
        <p>search results for {Carname}</p>
        {!is_loading ? (
          <>
            {cars.length == 0 ? (
              <h1 className="text-center">No Product Avilabel !</h1>
            ) : (
              <ProductCard
                cars={cars.length != 0 ? cars : []}
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
          <div className="flex justify-between items-center">
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

export default Search;
