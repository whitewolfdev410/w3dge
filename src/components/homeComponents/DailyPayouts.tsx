import { ArrowUp } from "../../icons";
import { Heading5 } from "../FontComponent";

function DailyPayouts() {
  return (
    <div className="flex justify-between gap-2 items-center mt-3">
      <ArrowUp />
      <div className="flex-1">
        <Heading5 text="6e0bAAeDCD6eCdb" style="!font-GRegular" />
        <Heading5
          text="26 March 2020, at 13:45 PM"
          style="!text-grey-grey1 !font-GRegular"
        />
      </div>
      <Heading5 text="+12.45" style="!text-primary-main" />
    </div>
  );
}

export default DailyPayouts;
