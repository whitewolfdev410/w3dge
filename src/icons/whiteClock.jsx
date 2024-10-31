import * as React from "react";
const SvgComponent = (props) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.625 6C0.625 3.03147 3.03147 0.625 6 0.625C8.96853 0.625 11.375 3.03147 11.375 6C11.375 8.96853 8.96853 11.375 6 11.375C3.03147 11.375 0.625 8.96853 0.625 6ZM6.75 4C6.75 3.58579 6.41421 3.25 6 3.25C5.58579 3.25 5.25 3.58579 5.25 4V5.73241C5.25 6.15035 5.45888 6.54064 5.80662 6.77247L7.08397 7.62404C7.42862 7.8538 7.89427 7.76067 8.12404 7.41603C8.3538 7.07138 8.26067 6.60573 7.91603 6.37596L6.75 5.59861V4Z"
      fill="white"
    />
  </svg>
);
export default SvgComponent;
