import React from "react";
import Banner from "./banner/Banner";

import TopCar from "./topcar/TopCar";
import MostPopular from "./mostdemandable/MostPopular";
import AboutCompany from "./aboutCompany/AboutCompany";
import Testmonial from "./testmonial/Testmonial";
import ProfileDropDown from "../../../reuseable/ProfileDropDown";

const Home = ({ showToast }) => {
  document.title = "Home";
  return (
    <div>
      <Banner />
      <TopCar showToast={showToast} />
      <MostPopular showToast={showToast} />
      <AboutCompany />
      <Testmonial />
    </div>
  );
};

export default Home;
