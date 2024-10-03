import TabComponent from "./tabComponent";
import { useState } from "react";

function TabMain() {
  const [tab, setTab] = useState("Requirements");

  const onClickFunction = (event: React.MouseEvent) => {
    setTab(event.currentTarget?.id);
  };
  return (
    <div className="grid max-w-[27rem] w-[80%]">
      <div className="grid grid-cols-2 border-b border-primary-main h-fit">
        <div
          className={`py-3 rounded-md ${
            tab === "Requirements" && "bg-primary-main"
          } -ml-2 cursor-pointer transition-all duration-300 ease-linear `}
          id="Requirements"
          onClick={onClickFunction}
        >
          <p className="text-center font-bold font-GBold text-white text-[1.25rem]">
            Requirements
          </p>
        </div>
        <div
          id="Earnings"
          className={`py-3 rounded-md ${
            tab === "Earnings" && "bg-primary-main"
          } -mr-2 cursor-pointer transition-all duration-300 ease-linear `}
          onClick={onClickFunction}
        >
          <p className="text-center font-bold font-GBold text-white text-[1.25rem]">
            Earnings
          </p>
        </div>
      </div>
      <div>
        <TabComponent />
      </div>
    </div>
  );
}

export default TabMain;
