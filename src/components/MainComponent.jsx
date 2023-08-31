import React, { useEffect } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Body from "./body/Body";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../redux/productSlice";
import { checkLogin } from "../redux/loginSlice";
import { BASEURL } from "./utils/BaseUrl";

const MainComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct(`${BASEURL}/api/car/`));
    dispatch(checkLogin());
  }, []);
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default MainComponent;
