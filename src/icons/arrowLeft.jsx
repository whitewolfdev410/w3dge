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
      d="M15.5 30.083c8.036 0 14.584-6.547 14.584-14.583 0-8.035-6.548-14.583-14.583-14.583C7.465.917.917 7.465.917 15.5s6.548 14.583 14.584 14.583Zm-4.068-15.356L16.58 9.58c.219-.219.496-.32.773-.32s.554.101.773.32a1.1 1.1 0 0 1 0 1.546L13.75 15.5l4.375 4.375a1.1 1.1 0 0 1 0 1.546 1.1 1.1 0 0 1-1.546 0l-5.148-5.148a1.074 1.074 0 0 1 0-1.546Z"
    />
  </svg>
);
export default SvgComponent;
