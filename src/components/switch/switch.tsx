import React, { useState } from "react";

const Switch: React.FC = () => {
  const [enabled, setEnabled] = useState(false); // Track whether the switch is enabled or disabled

  return (
    <div className="flex items-center justify-center w-fit h-fit">
      <div
        onClick={() => setEnabled(!enabled)}
        className={`${
          enabled ? "bg-primary-main" : "bg-gray-300"
        } relative inline-flex h-6 w-12 rounded-full transition-colors duration-300 cursor-pointer`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-0"
          } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300`}
        />
      </div>
    </div>
  );
};

export default Switch;
