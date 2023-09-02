import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsCartPlus } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../reuseable/ProfileDropDown";
import { CiMenuFries } from "react-icons/ci";
import { getSearchProducts } from "../../redux/searchProductSlice";
import { BASEURL } from "../utils/BaseUrl";

const Header = () => {
  const { cartItem } = useSelector((state) => state.shopingCart);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showHeader, setShowHeader] = useState("");
  const { token } = useSelector((state) => state.login);
  const location = useLocation();
  const [navClass, setNavClass] = useState("h-0 overflow-hidden");
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setNavClass(navClass ? "" : "h-0 overflow-hidden");
  };

  const searchProducts = (e) => {
    if (e.key == "Enter") {
      if (searchFieldValue) {
        dispatch(
          getSearchProducts(`${BASEURL}/api/car/?search=${searchFieldValue}`)
        );
        navigate(`/search/${searchFieldValue}`);
        setSearchFieldValue("");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const handelShowSearchBox = () => {
    setShowSearchBox(showSearchBox ? false : true);
  };
  const addboxShadow = (e) => {
    if (window.scrollY > 5) {
      setShowHeader("shadow shadow-lg");
    } else {
      setShowHeader("");
    }
  };
  window.addEventListener("scroll", addboxShadow);
  return (
    <section
      id="header"
      className={`bg-white  sticky top-0 z-50 ${showHeader}`}
    >
      <motion.div
        className="container "
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1.2 }}
      >
        <div className={`navbar flex justify-between items-center py-5`}>
          {/* left side  */}
          <div>
            <Link
              to={"/"}
              className="text-color-green-dark text-2xl lg:text-3xl font-medium"
            >
              Workhu
            </Link>
          </div>
          {/* middle */}
          <div className="hidden lg:block">
            <ul className="flex space-x-20 text-lg text-color-gray font-medium">
              <li>
                <NavLink
                  to={"/"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/shop"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/aboutus"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>
          {/* right */}
          <div className="lg:flex items-center space-x-8">
            <AnimatePresence>
              {showSearchBox && (
                <motion.div
                  className="border border-color-green rounded-md hidden lg:block"
                  whileTap={{ scale: 1.1 }}
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  exit={{ width: 0 }}
                >
                  <input
                    type="text"
                    value={searchFieldValue}
                    onChange={(e) => setSearchFieldValue(e.target.value)}
                    onKeyUp={searchProducts}
                    name=""
                    id=""
                    placeholder="Search Car... & press enter"
                    className="bg-transparent py-1 px-3 outline-none border-none w-full mx-auto"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="hidden lg:flex justify-center items-center text-lg cursor-pointer font-bold text-gray-400"
              whileTap={{ scale: 1.1 }}
              onClick={handelShowSearchBox}
            >
              <CiSearch color="gray" size={"25px"} />
            </motion.div>
            <Link to={"/mycart"}>
              <motion.div
                className="hidden lg:flex justify-center items-center text-lg cursor-pointer font-bold text-color-green-dark"
                whileTap={{ scale: 1.1 }}
              >
                <BsCartPlus color="gray" size={"25px"} />{" "}
                <span className="badge badge-secondary">
                  {" "}
                  {cartItem?.items?.length ? cartItem.items.length : 0}
                </span>
              </motion.div>
            </Link>

            {!token ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to={"/login"}
                  className="w-12 h-14 lg:w-20 lg:h-16 bg-color-green text-white px-5 py-3 rounded-md"
                >
                  Login
                </Link>
              </motion.div>
            ) : (
              <ProfileDropDown />
            )}
            <div className="lg:hidden cursor-pointer" onClick={toggleNavbar}>
              <CiMenuFries size={28} />{" "}
              <span className="text-red-900">{cartItem?.items?.length}</span>
            </div>
          </div>
        </div>
        {/* menu for mobile  */}
        <div
          className={`mobilemenu shadow-lg absolute top-full left-0 right-0 transition-all duration-150  w-full bg-white ${navClass} lg:hidden`}
        >
          <div className="py-3 px-5">
            <ul className="flex flex-col space-y-4 text-lg text-color-gray font-medium">
              <li>
                <NavLink
                  to={"/"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                  onClick={() => setNavClass("h-0 overflow-hidden")}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/shop"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                  onClick={() => setNavClass("h-0 overflow-hidden")}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/aboutus"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                  onClick={() => setNavClass("h-0 overflow-hidden")}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/contact"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                  onClick={() => setNavClass("h-0 overflow-hidden")}
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/mycart"}
                  className="hover:text-color-green transition-colors duration-300 ease-in"
                  onClick={() => setNavClass("h-0 overflow-hidden")}
                >
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Header;
