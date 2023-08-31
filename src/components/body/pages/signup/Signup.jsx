import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../reuseable/Spinner";
import Transition from "../../../reuseable/Transition";
import { motion } from "framer-motion";
import { BASEURL } from "../../../utils/BaseUrl";

const Signup = ({ showToast }) => {
  const navigate = useNavigate();
  const [is_loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userSignup = (values) => {
    setIsLoading(true);
    const email = values.email;
    const password = values.password;
    const is_owner = values.is_owner;
    const firstName = values.firstName;
    const lastName = values.lastName;
    const shopName = values.shopName;
    const phone = values.phone;

    /// sign up
    axios
      .post(`${BASEURL}/auth/users/`, {
        email: email,
        password: password,
        is_owner: is_owner,
      })
      .then((res) => {
        const userId = res.data.id;

        if (is_owner) {
          axios
            .post(`${BASEURL}/api/ownerprofile/`, {
              first_name: firstName,
              last_name: lastName,
              company_name: shopName,
              phone: phone,
              user_id: userId,
            })
            .then((res) => {
              setIsLoading(false);

              showToast("Registered Successfully !");
              navigate("/login");
            });
        } else {
          axios
            .post(`${BASEURL}/api/clientprofile/`, {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              user_id: userId,
            })
            .then((res) => {
              setIsLoading(false);
              showToast("Registered Successfully !");
              navigate("/login");
            });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.email[0]);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
  };
  document.title = "Register";

  return (
    <Transition>
      <section className="bg-gray-100 py-10">
        <div className="container flex justify-center items-center">
          {!is_loading ? (
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
                shopName: "",
                is_owner: false,
              }}
              validate={(values) => {
                let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
                let errors = {};
                if (!regex.test(values.email)) {
                  errors.email = "email syntax not valid !";
                }
                if (values.password.length < 8) {
                  errors.password = "password must be 8 character !";
                }
                if (!/^[0-9]+$/.test(values.phone)) {
                  errors.phone = "Number not Valid";
                }

                return errors;
              }}
              onSubmit={(values) => {
                userSignup(values);
              }}
            >
              {({ values, handleSubmit, handleChange, errors }) => (
                <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                  <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">
                      REGISTER
                    </h1>
                    <p>Enter your information to register</p>
                  </div>
                  {errorMessage && (
                    <h1 className="text-red-700 text-xl text-center">
                      {errorMessage}
                    </h1>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="flex -mx-3">
                      <div className="w-1/2 px-3 mb-5">
                        <label className="text-xs font-semibold px-1">
                          First name
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="John"
                            value={values.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-1/2 px-3 mb-5">
                        <label className="text-xs font-semibold px-1">
                          Last name
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={values.lastName}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="Smith"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label className="text-xs font-semibold px-1">
                          Phone
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={values.phone}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="01941758333"
                            onChange={handleChange}
                            required
                          />{" "}
                        </div>
                        <span className="text-red-700">{errors.phone}</span>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label className="text-xs font-semibold px-1">
                          Email
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="johnsmith@example.com"
                            onChange={handleChange}
                            required
                          />{" "}
                        </div>
                        <span className="text-red-700">{errors.email}</span>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-12">
                        <label className="text-xs font-semibold px-1">
                          Password
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                          </div>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                            placeholder="************"
                            onChange={handleChange}
                            required
                          />{" "}
                        </div>
                        <span className="text-red-700">{errors.password}</span>
                      </div>
                    </div>
                    {values.is_owner && (
                      <motion.div
                        className="flex -mx-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="w-full px-3 mb-12">
                          <label className="text-xs font-semibold px-1">
                            Shop Name
                          </label>
                          <div className="flex">
                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                              <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                            </div>
                            <input
                              type="text"
                              name="shopName"
                              id="shopName"
                              value={values.shopName}
                              className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                              placeholder="shop"
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex -mx-3">
                      <div className="w-full px-3 pl-4 mb-12">
                        <div className="flex">
                          <input
                            type="checkbox"
                            name="is_owner"
                            id="is_owner"
                            className="checkbox"
                            value={values.is_owner}
                            onChange={handleChange}
                          />
                          <span className="pl-3">
                            Create account as a Owner
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <button
                          className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                          type="submit"
                        >
                          REGISTER NOW
                        </button>
                        <p className="mt-8">
                          Have an account?{" "}
                          <Link
                            to={"/login"}
                            className="text-blue-500 hover:text-blue-700 font-semibold"
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          ) : (
            <Spinner />
          )}
        </div>
      </section>
    </Transition>
  );
};

export default Signup;
