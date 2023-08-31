import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineTwitter, AiFillYoutube } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const Footer = () => {
  const { ref, inView, entry } = useInView();
  const animation = useAnimation();
  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
      });
    } else {
      animation.start({
        opacity: 0,
        y: "100vh",
      });
    }
  }, [inView]);
  return (
    <section className="py-24" ref={ref}>
      <motion.div
        className="container flex flex-col md:flex-row flex-wrap justify-between"
        animate={animation}
        transition={{ type: "spring", duration: 2 }}
      >
        <div className="w-full md:w-1/2 lg:w-1/4 mb-16">
          <h1 className="text-gray-700 text-2xl lg:text-3xl font-bold ">
            Workhu
          </h1>
          <p className="text-lg text-color-gray-dark py-6">
            Use securing confined his shutters. <br /> Delightful as he it
            acceptance <br /> an solicitude discretion.
          </p>
          <a href="tel:01941758333">
            <p className="py-2">&#9742; 01941758333</p>
          </a>
          <p> &#x1F4E7; tanjilhossain845@gmail.com</p>
        </div>
        {/* ........ */}
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/4 mb-16">
          <h1 className="text-gray-700 text-2xl lg:text-3xl font-bold ">
            Company
          </h1>
          <Link to={"/"} className="pt-6">
            New York
          </Link>
          <Link to={"/"} className="py-2">
            Careers
          </Link>
          <Link to={"/"}>Mobile</Link>
          <Link to={"/"} className="py-2">
            Blog
          </Link>
          <Link to={"/"}>How we Work</Link>
        </div>
        {/* ........ */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-16">
          <h1 className="text-gray-700 text-2xl lg:text-3xl font-bold ">
            Working Hours
          </h1>
          <p className="py-6 text-color-gray-dark">
            Mon-Fri <span className="text-black">9.00AM-9.00PM</span>
          </p>
          <p className="py-6 text-color-gray-dark">
            Sat <span className="text-slate-900">9.00AM-7.00PM</span>
          </p>
          <p className="py-6 text-color-gray-dark">
            Sum <span className="text-slate-900">Closed</span>
          </p>
        </div>
        {/* ........ */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-16">
          <h1 className="text-gray-700 text-2xl lg:text-3xl font-bold ">
            Subcription
          </h1>
          <p className="text-lg text-color-gray-dark py-6">
            Subscribe your Email address for latest news & updates.
          </p>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="text-slate-900 text-center py-4 px-7 bg-[#ECECEC] focus:ring-2 focus:ring-green-600"
          />{" "}
          <br />
          <button className="py-4 px-4 bg-color-green-dark text-white mt-6 hover:bg-color-green transition-all duration-200">
            Submit
          </button>
        </div>
      </motion.div>
      <div className="container flex justify-center flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between items-center py-3">
        <span className="text-slate-900 font-medium">
          &copy; copyright and made by{" "}
          <span className="text-color-green-dark">Tanjil Hossain</span>
        </span>
        <div className="flex space-x-5">
          <a href="https://www.facebook.com/innosent.boy.Iam/">
            <BiLogoFacebook />
          </a>
          <span>
            <AiFillYoutube />
          </span>
          <span>
            <AiOutlineTwitter />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Footer;
