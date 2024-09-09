import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.714 6.333H2.286C1.576 6.333 1 6.93 1 7.667v4C1 12.403 1.576 13 2.286 13h6.428c.71 0 1.286-.597 1.286-1.333v-4c0-.737-.576-1.334-1.286-1.334Z"
    />
    <path
      stroke="#AAA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.5 10.334a.655.655 0 0 0 .643-.667A.655.655 0 0 0 5.5 9a.655.655 0 0 0-.643.667c0 .368.288.667.643.667ZM2.93 6.333V3.667c0-.708.27-1.386.753-1.886A2.526 2.526 0 0 1 5.5 1c.682 0 1.336.281 1.818.781.483.5.754 1.178.754 1.886v2.666"
    />
  </svg>
);
export default SvgComponent;
