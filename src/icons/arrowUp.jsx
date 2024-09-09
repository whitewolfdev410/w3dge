import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={35}
    height={36}
    fill="none"
    {...props}
  >
    <circle
      cx={17.5}
      cy={18}
      r={17}
      stroke="#01B574"
      transform="rotate(-180 17.5 18)"
    />
    <path
      stroke="#01B574"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="m14.125 17.719 3.375-3.375 3.375 3.375M17.5 14.813v6.843"
    />
  </svg>
);
export default SvgComponent;
