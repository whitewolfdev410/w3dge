import { ArrowUp } from "../../icons";
import { Heading5 } from "../FontComponent";

function DailyPayouts({ item }: { item: any }) {
  const todayDate = new Date().toISOString();
  return (
    <div className="flex justify-between gap-2 items-center mt-3">
      <ArrowUp />
      <div className="flex-1">
        <Heading5 text={item?.generic_tx} style="!font-GRegular" />
        <Heading5 text={todayDate} style="!text-grey-grey1 !font-GRegular" />
      </div>
      <Heading5 text={'+' + item?.amount} style="!text-primary-main" />
    </div>
  );
}

export default DailyPayouts;
