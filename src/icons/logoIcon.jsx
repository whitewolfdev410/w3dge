import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={26}
    height={20}
    fill="none"
    {...props}
  >
    <path fill="url(#a)" d="M.186 0H25.22v20H.186z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref="#image0_1_14306"
          transform="matrix(.00063 0 0 .00089 0 -1.33)"
        />
      </pattern>
    </defs>
  </svg>
);
export default SvgComponent;
