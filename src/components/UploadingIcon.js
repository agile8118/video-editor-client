import React from "react";

const UploadingIcon = ({ animated }) => {
  return (
    <svg
      width="60px"
      height="60px"
      viewBox="0 0 31 31"
      version="1.1"
      className="box__icon"
    >
      <path
        id="bottom"
        d="M24.498 18.507 L24.494 22.507 C24.494 23.038 24.283 23.546 23.907 23.921 23.532 24.296 23.023 24.506 22.493 24.506 L8.493 24.494 C7.962 24.494 7.454 24.283 7.079 23.907 6.704 23.532 6.494 23.023 6.494 22.493 L6.498 18.493"
        fill="none"
        stroke="#0d3046"
        strokeWidth="2"
        strokeOpacity="1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <g id={animated ? "arrow" : ""}>
        <path
          id="arrow-tri"
          d="M20.503 11.504 L15.507 6.5 10.503 11.496"
          fill="none"
          stroke="#0d3046"
          strokeWidth="2"
          strokeOpacity="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          id="arrow-line"
          d="M15.507 6.5 L15.498 18.5"
          fill="none"
          stroke="#0d3046"
          strokeWidth="2"
          strokeOpacity="1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default UploadingIcon;
