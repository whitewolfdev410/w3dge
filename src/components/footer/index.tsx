import WontToLearn from "./WontToLearn";
import PureComponent from "../charts/SimpleRadialBarChart";
import CounterAnimation from "../animation/counterAnimation";
import { PayoutData } from "../../assets/footerdata";

function Footer(data: any) {
  return (
    <div className=" w-full  xl:flex grid pt-0">
      <div className="hidden xl:block -mt-5">
        <WontToLearn />
      </div>
      <div className=" gap-7 flex-1 justify-center pt-20 hidden xl:flex xl:pr-10">
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Active Validators
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={data.networkStats?.unique_validator_count ?? 0}
              countSteps={50}
            />
            {/* <p className="font-GRegular font-normal text-sm text-primary-main">
              +13.6%
            </p> */}
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Total Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={data.networkStats?.total_bandwidth ?? 0}
              countSteps={50}
            />
            {/* <p className="font-GRegular font-normal text-sm text-primary-main">
              +13.6%
            </p> */}
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Bandwidth Today
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={data.networkStats?.total_bandwidth_daily ?? 0}
              countSteps={50}
            />
            {/* <p className="font-GRegular font-normal text-sm text-primary-main">
              +13.6%
            </p> */}
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Total Earning
          </p>
          <div className="flex items-end gap-1 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={data.networkStats?.total_earnings ?? 0}
              countSteps={50}
            />
            <p className="font-GRegular font-normal text-sm text-primary-main pb-1">
              CDN
            </p>
          </div>
        </div>
      </div>
      <div className="grid justify-center md:flex md:justify-between md:mt-10 mt-0">
        <div className="md:mt-10 mt-0 md:mt-0 flex justify-center xl:hidden">
          <WontToLearn />
        </div>
        <div className="  relative mt-8 md:mt-0 h-[11.25rem] w-[11.25rem] xl:flex hidden">
          <PureComponent />
          <div className="grid absolute top-[22%] left-[25%] justify-center w-[4.25rem]">
            <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mb-3">
              {" "}
              Payout
            </p>
            <CounterAnimation
              style="font-GBold font-bold text-[2.5rem] text-white text-center"
              step={Math.floor(data.networkStats?.average_daily_revenue) ?? 0}
              countSteps={1}
              duration={1000}
            />
            <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mt-3">
              {PayoutData.token}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
