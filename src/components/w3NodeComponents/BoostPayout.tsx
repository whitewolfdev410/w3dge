import { Heading5 } from "../FontComponent";
import LogoIcon from "../../assets/images/logo.png";
import { Clock, Lock } from "../../icons";
import ValedateImage from "../../assets/images/validatore.png";
import Tooltip from "../Tooltip";
import CounterAnimation from "../animation/counterAnimation";
import PieChartComponent from "../charts/PipChartComponent";
import PieChartContent from "../dashboardComponent/pieChartContent";

interface IPropsBoostPayout {
  title: string;
  precentage: any;
  subtitle?: string;
  amount: string;
  stockNow?: boolean;
  validators: boolean;
  level?: string;
  is_piechart?: boolean;
  earned?: any;
}

function BoostPayout({
  amount,
  precentage,
  title,
  validators,
  stockNow,
  subtitle,
  level,
  is_piechart,
  earned
}: IPropsBoostPayout) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat  rounded-xl w-[18rem]"
      style={{
        background:
          "linear-gradient(0deg, rgba(26,26,26,1) 0%, rgba(26,26,26,1) 100%)",
      }}
    >
      <div className="p-9" style={{paddingBottom: is_piechart ? 0 : '2.8rem'}}>
        <div className="flex justify-between gap-8">
          <div>
            <Heading5 text={is_piechart ? 'Your Share' : title} />
            <CounterAnimation
              style="font-bold font-GBold text-[2.5rem] text-primary-main"
              step={parseInt(precentage)}
              countSteps={0.3}
              duration={500}
              tagText="%"
            />
            {subtitle ? (
              <p className="font-normal font-GRegular text-[0.75rem] text-grey-grey1">
                {subtitle}
              </p>
            ) : (
              <p className="font-normal font-GRegular text-[0.75rem] text-grey-grey1">
                Higher{" "}
                <span className="font-normal font-GBold text-[0.75rem] text-white">
                  daily
                </span>{" "}
                earning%
              </p>
            )}
          </div>
          {is_piechart && (
            <div>
              <div className="flex justify-between">
                <Heading5 text={'Earned'} />
                <div
                  className="w-[1.62rem] h-[1.25rem] "
                  style={{
                    backgroundImage: `url(${LogoIcon})`,
                  }}
                ></div>
              </div>
              <CounterAnimation
                style="text-primary-main font-GBold font-bold text-[1.25rem]"
                step={earned}
                countSteps={1}
                duration={1000}
              />
            </div>
          )}
        </div>
        {is_piechart ? (
          <div className="w-[9.5rem] h-[9.5rem] grid relative mx-auto">
            <PieChartComponent color={"#00B649"} />
            <PieChartContent amount={amount} title="Staked"/>
          </div>
        ) : (
          <>
            <div className="bg-black flex justify-between px-3 py-1 gap-12 items-center mt-8 rounded-md">
              <div className="flex gap-2 items-center ">
                <div
                  className="w-[1.62rem] h-[1.25rem] "
                  style={{
                    backgroundImage: `url(${LogoIcon})`,
                  }}
                ></div>
                <CounterAnimation
                  style="text-primary-main font-GBold font-bold text-[1.25rem]"
                  step={amount}
                  countSteps={1}
                  duration={1000}
                />
              </div>
              <p className="text-white font-GRegular font-normal text-[0.62rem]">
                required
              </p>
            </div>
          <div className="flex justify-between mt-2">
            <Tooltip text="details ">
              <div className="flex gap-3 border border-[#AAAAAA] rounded-md items-center py-1 px-2 cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-main hover:border-primary-main">
                <Clock />
                <p className="font-normal font-GRegular text-[0.62rem] text-white">
                  no exparation
                </p>
              </div>
            </Tooltip>
            <Tooltip text="details">
              <div className="flex gap-5 border border-[#AAAAAA] rounded-md items-center py-1 px-2 cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-main hover:border-primary-main">
                <Lock />
                <p className="font-normal font-GRegular text-[0.62rem] text-white">
                  168 hours
                </p>
              </div>
            </Tooltip>
          </div>
          </>
        )}
        {stockNow && (
          <div className="bg-black flex justify-center items-center rounded-md mt-10 py-2 transition-all duration-300 ease-linear cursor-pointer text-primary-main hover:text-white hover:bg-primary-main">
            <p className="font-GBold font-bold text-[1.25rem]  hover:text-white">
              Stake now
            </p>
          </div>
        )}
      </div>
      {validators && (
        <div className="flex items-end gap-5">
          <div
            className="w-[8.93rem] h-[6.62rem]"
            style={{
              backgroundImage: `url(${ValedateImage})`,
            }}
          ></div>
          <div className="flex items-end h-fit">
            <CounterAnimation
              style="font-bold font-GBold text-[2.5rem] text-white leading-10"
              step={level}
              countSteps={1}
              duration={300}
            />
            <div>
              <p className="font-normal font-GRegular text-[0.75rem] text-white pb-0 -mb-1">
                Level
              </p>
              <p className="font-normal font-GRegular text-[0.75rem] text-white pt-0">
                Validator
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoostPayout;
