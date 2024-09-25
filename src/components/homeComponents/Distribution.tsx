import { useEffect, useState } from "react";
import { Bodoy1 } from "../FontComponent";

function Distribution({
  name,
  amount,
  width,
}: {
  name: string;
  width: string;
  amount: any;
}) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Animate width on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
    }, 200); // Delay to trigger animation (200ms for smoother start)

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <div className="mt-3">
      <div
        className="bg-white  h-2 rounded-full mt-1 relative block"
        style={{ width: "calc(100% - 3.12rem)" }}
      >
        <div
          className={`absolute top-0 left-0 h-2  bg-primary-main z-10 rounded-full block  transition-all duration-1000 ease-linear`}
          style={{ width: isExpanded ? (amount + '%') : "w-[5%]" }}
        ></div>
      </div>
      <div className=" justify-between grid grid-cols-[auto_2rem] ">
        <Bodoy1 text={name} />
        <Bodoy1 text={amount} />
      </div>
    </div>
  );
}

export default Distribution;
