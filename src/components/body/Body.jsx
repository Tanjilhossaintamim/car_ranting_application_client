import React from "react";
import Home from "./pages/home/Home";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Shop from "./pages/shop/Shop";
import { AnimatePresence } from "framer-motion";
import Details from "./pages/details/Details";
import ShopingCart from "./pages/shopingCart/ShopingCart";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import Profile from "./pages/profile/Profile";
import UpdateProfile from "./pages/profile/Profile";
import OwnerProduct from "./pages/ownerproduct/OwnerProduct";
import AddCar from "./pages/addCar/AddCar";
import EditCar from "./pages/editcar/EditCar";
import Search from "./pages/search/Search";

const Body = () => {
  const { token } = useSelector((state) => state.login);
  const showToast = (message) => {
    toast(message);
  };
  const location = useLocation();

  return (
    <AnimatePresence>
      <div className="overflow-hidden">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home showToast={showToast} />} />
          <Route path="/shop" element={<Shop showToast={showToast} />} />
          <Route
            path="/car-details/:carname/:carId"
            element={<Details showToast={showToast} />}
          />
          <Route
            path="/mycart"
            element={<ShopingCart showToast={showToast} />}
          />
          <Route
            path="/search/:Carname"
            element={<Search showToast={showToast} />}
          />
          {!token ? (
            <>
              <Route
                path="/register"
                element={<Signup showToast={showToast} />}
              />
              <Route path="/login" element={<Login showToast={showToast} />} />
              <Route path="*" element={<Navigate to={"/"} />} />
            </>
          ) : (
            <>
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      localStorage.getItem("location")
                        ? `${localStorage.getItem("location")}`
                        : "/"
                    }
                  />
                }
              />

              <Route
                path="/myprofile"
                element={<UpdateProfile showToast={showToast} />}
              />
              <Route
                path="/myproduct"
                element={<OwnerProduct showToast={showToast} />}
              />
              <Route
                path="/addcar"
                element={<AddCar showToast={showToast} />}
              />
              <Route
                path="/editcar/:name/:carId"
                element={<EditCar showToast={showToast} />}
              />
            </>
          )}
        </Routes>

        <ToastContainer />
      </div>
    </AnimatePresence>
  );
};

export default Body;
