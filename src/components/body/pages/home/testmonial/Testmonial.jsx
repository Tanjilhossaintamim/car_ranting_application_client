import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import reviews from "../../../../utils/data";
import { sliderSettings } from "../../../../utils/sliderSettings";
import Img from "../../../../../assets/christian-buehner-DItYlc26zVI-unsplash.jpg";
import "./tesmonial.css";

const Testmonial = () => {
  return (
    <section className="py-10">
      <div className="container py-14 h-96 overflow-y-hidden">
        <div className="heading text-center pb-5">
          <h1 className="text-2xl lg:text-4xl font-bold ">
            Clients' Testimonials
          </h1>
        </div>
        <Swiper
          {...sliderSettings}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {reviews.map((review) => {
            return (
              <SwiperSlide key={review.id}>
                <div className="py-10 shadow-2xl px-5 bg-white">
                  <div>
                    <h1 className="text-xl font-bold">" {review.review}"</h1>
                  </div>
                  <div className="flex space-x-5 mt-5">
                    <img src={Img} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <span className="font-bold">{review.name}</span>
                      <br />
                      <span>Web Developer</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testmonial;
