import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 13.214a5.714 5.714 0 1 1 0-11.428 5.714 5.714 0 0 1 0 11.428Z"
    />
    <path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 5.357v2.857H10"
    />
  </svg>
);
export default SvgComponent;
