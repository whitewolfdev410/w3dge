import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M9 .5c-4.969 0-9 4.031-9 9s4.031 9 9 9 9-4.031 9-9-4.031-9-9-9Zm-.281 14.25a.938.938 0 1 1 0-1.875.938.938 0 0 1 0 1.875Zm1.567-4.781c-.76.51-.864.977-.864 1.406a.656.656 0 1 1-1.313 0c0-1.027.473-1.844 1.445-2.497.904-.606 1.415-.99 1.415-1.836 0-.574-.328-1.01-1.008-1.334-.16-.076-.515-.15-.953-.145-.55.007-.976.139-1.305.403-.62.499-.672 1.042-.672 1.05a.657.657 0 0 1-1.312-.064c.005-.114.084-1.14 1.16-2.006.56-.449 1.27-.682 2.11-.693.596-.007 1.155.094 1.534.273 1.135.537 1.758 1.432 1.758 2.516 0 1.586-1.06 2.298-1.995 2.927Z"
    />
  </svg>
);
export default SvgComponent;
