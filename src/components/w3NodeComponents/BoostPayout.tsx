import { Heading5 } from "../FontComponent";
import LogoIcon from "../../assets/images/logo.png";
import { Clock, Lock } from "../../icons";
import ValedateImage from "../../assets/images/validatore.png";
import Tooltip from "../Tooltip";

interface IPropsBoostPayout {
  title: string;
  precentage: string;
  subtitle?: string;
  amount: string;
  stockNow?: boolean;
  validators: boolean;
  level?: string;
}

function BoostPayout({
  amount,
  precentage,
  title,
  validators,
  stockNow,
  subtitle,
  level,
}: IPropsBoostPayout) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat  rounded-xl"
      style={{
        background:
          "linear-gradient(0deg, rgba(26,26,26,1) 0%, rgba(26,26,26,1) 100%)",
      }}
    >
      <div className=" p-9">
        <Heading5 text={title} />
        <div>
          <p className="font-bold font-GBold text-[2.5rem] text-primary-main">
            {precentage}
          </p>
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
        <div className="bg-black flex justify-between px-3 py-1 gap-12 items-center mt-8 rounded-md">
          <div className="flex gap-2 items-center ">
            <div
              className="w-[1.62rem] h-[1.25rem] "
              style={{
                backgroundImage: `url(${LogoIcon})`,
              }}
            ></div>
            <p className="text-primary-main font-GBold font-bold text-[1.25rem]">
              {amount}
            </p>
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
            <p className="font-bold font-GBold text-[2.5rem] text-white leading-10">
              {level}
            </p>
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
