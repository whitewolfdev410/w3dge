import WontToLearn from "./WontToLearn";
import PureComponent from "../charts/SimpleRadialBarChart";
import CounterAnimation from "../animation/counterAnimation";

function Footer() {
  return (
    <div className="container footer-section grid xl:flex pt-7 ">
      <div className="flex flex-wrap gap-5 flex-1 justify-center pt-8 xl:hidden">
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Active Validators
          </p>
          <div className="flex items-end gap-2 mt-1">
            <p className="font-GRegular font-normal text-3xl text-white">
              14,744
            </p>
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Total Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <p className="font-GRegular font-normal text-3xl text-white">
              24,744
            </p>
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Resold Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <p className="font-GRegular font-normal text-3xl text-white">
              14,744
            </p>
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Distributed Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <p className="font-GRegular font-normal text-3xl text-white">
              14,744
            </p>
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        <WontToLearn />
      </div>
      <div className=" gap-5 flex-1 justify-center pt-20 hidden xl:flex">
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Active Validators
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={14744}
              countSteps={100}
            />
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Total Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={14744}
              countSteps={100}
            />
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Resold Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={14744}
              countSteps={100}
            />
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
        <div>
          <p className="font-GBold font-normal text-sm text-white">
            Distributed Bandwidth
          </p>
          <div className="flex items-end gap-2 mt-1">
            <CounterAnimation
              style="font-GRegular font-normal text-3xl text-white"
              step={14744}
              countSteps={100}
            />
            <p className="font-GRegular font-normal text-sm text-primary-main">
              +13,6%
            </p>
          </div>
        </div>
      </div>
      <div className="grid justify-center md:flex md:justify-between mt-10 ">
        <div className="mt-10 md:mt-0 flex justify-center xl:hidden">
          <WontToLearn />
        </div>
        <div className="  relative mt-8 md:mt-0 h-[180px] w-[180px]">
          <PureComponent />
          <div className="grid w-fit absolute top-[50px] left-[60px]">
            <p className="font-GRegular font-normal text-[12px] text-white text-end">
              {" "}
              Payout
            </p>
            <CounterAnimation
              style="font-GBold font-bold text-5xl text-white"
              step={9.3}
              countSteps={1}
              duration={1000}
            />
            {/* <p className="font-GBold font-bold text-5xl text-white ">9.3</p> */}
            <p className="font-GRegular font-normal text-[12px] text-white text-end">
              CDN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
