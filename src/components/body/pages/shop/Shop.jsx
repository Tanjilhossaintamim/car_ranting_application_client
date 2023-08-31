import React from "react";
import ShopBanner from "./shopbanner/ShopBanner";
import ShopProduct from "./shopProduct/ShopProduct";
import Transition from "../../../reuseable/Transition";

const Shop = ({ showToast }) => {
  document.title = "Shop";
  return (
    <Transition>
      <div>
        <ShopBanner />
        <ShopProduct showToast={showToast} />
      </div>
    </Transition>
  );
};

export default Shop;
