import React from "react";

const Skeleton = () => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/4 mx-5  p-4 mb-9 rounded-md hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300">
      <div className="">
        <div className="h-52 mb-3 skeleton"></div>
        <div className=" flex flex-col">
          <h1 className="text-xl font-bold py-3  text-gray-700 w-10/12 skeleton"></h1>
          <div className="flex justify-between items-center mb-4">
            <div className="w-40 h-4 skeleton"></div>
            <div className="w-10 h-10 rounded-full skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
