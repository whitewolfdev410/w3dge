import { useState } from "react";

const TabComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p className="font-bold font-GBold text-[1rem] text-white mt-14">Ask a question</p>
      <p className="font-normal font-GRegular text-[1rem] text-white mt-14">
        We know that 1 day = 24 hours so , 7 multiply by 24 7 days = 7 x 24 =
        168 Hence there are 168 hours in 7 days.
      </p>
      {isExpanded && (
        <>
          <p className="font-bold font-GBold text-[1rem] text-white mt-14">Ask a question</p>
          <p className="font-normal font-GRegular text-[1rem] text-white mt-14">
            We know that 1 day = 24 hours so , 7 multiply by 24 7 days = 7 x 24 =
            168 Hence there are 168 hours in 7 days.
          </p>
          <p className="font-bold font-GBold text-[1rem] text-white mt-14">Ask a question</p>
          <p className="font-normal font-GRegular text-[1rem] text-white mt-14">
            We know that 1 day = 24 hours so , 7 multiply by 24 7 days = 7 x 24 =
            168 Hence there are 168 hours in 7 days.
          </p>
        </>
      )}
      <button
        onClick={toggleExpand}
        className="mt-4 text-blue-500 underline"
      >
        {isExpanded ? "Show Less" : "Learn More"}
      </button>
    </div>
  );
};

export default TabComponent;
