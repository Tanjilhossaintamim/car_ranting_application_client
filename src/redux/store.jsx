import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import shopSlice from "./shopSlice";
import catagorySlice from "./catagorySlice";
import shopingCartSlice from "./shopingCartSlice";
import loginSlice from "./loginSlice";
import profilSlice from "./profilSlice";
import ownerProductSlice from "./ownerProductSlice";
import searchProductSlice from "./searchProductSlice";

const store = configureStore({
  reducer: {
    car: productSlice,
    shop: shopSlice,
    catagory: catagorySlice,
    shopingCart: shopingCartSlice,
    login: loginSlice,
    profile: profilSlice,
    ownerCar: ownerProductSlice,
    search: searchProductSlice,
  },
});

export default store;
