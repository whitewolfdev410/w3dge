import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={31}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      fillOpacity={0.61}
      d="M15.5.917C7.463.917.915 7.465.915 15.5s6.548 14.583 14.583 14.583c8.036 0 14.584-6.548 14.584-14.583S23.535.917 15.499.917Zm4.068 15.356L14.42 21.42c-.219.219-.496.32-.773.32s-.554-.101-.773-.32a1.1 1.1 0 0 1 0-1.546L17.25 15.5l-4.375-4.375a1.1 1.1 0 0 1 0-1.546 1.1 1.1 0 0 1 1.546 0l5.148 5.148a1.074 1.074 0 0 1 0 1.546Z"
    />
  </svg>
);
export default SvgComponent;
