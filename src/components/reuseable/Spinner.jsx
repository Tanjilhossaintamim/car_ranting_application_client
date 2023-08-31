import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="h-96 w-96 flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default Spinner;
