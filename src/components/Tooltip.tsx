import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  handleStaked?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, handleStaked }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`relative flex items-center ${
        handleStaked ? "w-[50%] justify-center" : ""
      }`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute  top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg whitespace-no-wrap">
          {text}
          <div className="absolute -mb-1 bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
