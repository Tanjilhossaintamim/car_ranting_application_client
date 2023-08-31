import React, { useState } from "react";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { saveLoginInfo } from "../../../../redux/loginSlice";
import Spinner from "../../../reuseable/Spinner";
import Transition from "../../../reuseable/Transition";
import { BASEURL } from "../../../utils/BaseUrl";

const Login = ({ showToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userLogin = (values) => {
    setLoading(true);
    axios
      .post(`${BASEURL}/auth/jwt/create/`, {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        setLoading(false);
        setErrorMessage("");
        showToast("Logged in Successfully !");
        const token = res.data.access;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userId", decodedToken.user_id);
        localStorage.setItem("expiredTime", decodedToken.exp * 1000);
        localStorage.setItem("token", token);

        // this portion will check if any location had saved then it will navigate to there it is good user expreince
        const location = localStorage.getItem("location");
        if (location) {
          navigate(location);
        } else {
          navigate("/");
        }
        dispatch(saveLoginInfo({ token: token, userId: decodedToken.user_id }));
      })
      .catch((error) => {
        setErrorMessage(error.response.data.detail);
        setLoading(false);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      });
  };
  document.title = "Login";
  return (
    <Transition>
      <section className="bg-gray-100 py-10">
        <div className="container flex justify-center items-center">
          {!loading ? (
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
                let errors = {};
                if (!regex.test(values.email)) {
                  errors.email = "email syntax not valid !";
                }
                if (values.password.length < 8) {
                  errors.password = "password must be 8 character !";
                }
                return errors;
              }}
              onSubmit={(values) => {
                userLogin(values);
              }}
            >
              {({ values, handleChange, handleSubmit, errors }) => (
                <div className="w-full md:w-3/6 h-100">
                  <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
                    Log in to your account
                  </h1>
                  <h1 className="text-red-700 text-xl">
                    {errorMessage && errorMessage}
                  </h1>

                  <form className="mt-6" action="#" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id=""
                        value={values.email}
                        onChange={handleChange}
                        placeholder="Enter Email Address"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        required
                      />
                      <span className="text-red-700">{errors.email}</span>
                    </div>

                    <div className="mt-4">
                      <label className="block text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        id=""
                        placeholder="Enter Password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                        required
                      />
                      <span className="text-red-700">{errors.password}</span>
                    </div>

                    <div className="text-right mt-2">
                      <a
                        href="#"
                        className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                      >
                        Forgot Password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                    >
                      Log In
                    </button>
                  </form>

                  <hr className="my-6 border-gray-300 w-full" />

                  <button
                    type="button"
                    className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
                  >
                    <div className="flex items-center justify-center">
                      <span
                        className="ml-4"
                        onClick={() =>
                          showToast("This Feature is Comming Soon !")
                        }
                      >
                        Log in with Google
                      </span>
                    </div>
                  </button>

                  <p className="mt-8">
                    Need an account?{" "}
                    <Link
                      to={"/register"}
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Create an account
                    </Link>
                  </p>
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

export default Login;
