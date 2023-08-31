import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = ({ src }) => {
  return (
    <div>
      <LazyLoadImage src={src} width={"100%"} />
    </div>
  );
};

export default Image;
