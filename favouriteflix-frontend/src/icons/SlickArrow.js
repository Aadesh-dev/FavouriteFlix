import React from "react";
import ArrowIcon from "./ArrowIcon";

const SlickArrow = ({ currentSlide, slideCount, ...props }) => {
  return (
    <button type="button" {...props} tabIndex={0}>
      <ArrowIcon />
    </button>
  );
};

export default SlickArrow;
