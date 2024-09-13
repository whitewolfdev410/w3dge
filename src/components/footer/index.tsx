import WontToLearn from "./WontToLearn";
import PureComponent from "../charts/SimpleRadialBarChart";
import CounterAnimation from "../animation/counterAnimation";
import { FooterData, PayoutData } from "../../assets/footerdata";

function Footer() {
  return (
    <div className=" w-full  xl:flex grid pt-0">
      <div className="flex flex-wrap gap-5 flex-1 justify-center pt-8 xl:hidden">
        {FooterData.map((item) => (
          <div>
            <p className="font-GBold font-normal text-sm text-white">
              {item.title}
            </p>
            <div className="flex items-end gap-2 mt-1">
              <CounterAnimation
                style="font-GRegular font-normal text-3xl text-white"
                step={item.value}
                countSteps={50}
              />
              <p className="font-GRegular font-normal text-sm text-primary-main">
                {item.percentage}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden xl:block -mt-5">
        <WontToLearn />
      </div>
      <div className=" gap-7 flex-1 justify-center pt-20 hidden xl:flex xl:pr-10">
        {FooterData.map((item) => (
          <div>
            <p className="font-GBold font-normal text-sm text-white">
              {item.title}
            </p>
            <div className="flex items-end gap-2 mt-1">
              <CounterAnimation
                style="font-GRegular font-normal text-3xl text-white"
                step={item.value}
                countSteps={50}
              />
              <p className="font-GRegular font-normal text-sm text-primary-main">
                {item.percentage}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid justify-center md:flex md:justify-between mt-10 ">
        <div className="mt-10 md:mt-0 flex justify-center xl:hidden">
          <WontToLearn />
        </div>
        <div className="  relative mt-8 md:mt-0 h-[11.25rem] w-[11.25rem]">
          <PureComponent />
          <div className="grid w-fit absolute top-[2.61rem] left-[2.61rem]">
            <p className="font-GRegular font-normal text-[0.75rem] text-white text-end -mb-3">
              {" "}
              Payout
            </p>
            <CounterAnimation
              style="font-GBold font-bold text-[2.5rem] text-white"
              step={PayoutData.amount}
              countSteps={1}
              duration={1000}
            />
            <p className="font-GRegular font-normal text-[0.75rem] text-white text-end -mt-3">
              {PayoutData.token}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
