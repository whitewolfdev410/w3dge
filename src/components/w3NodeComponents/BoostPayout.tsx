import { Heading5 } from "../FontComponent";
import LogoIcon from "../../assets/images/logo.png";
import { Clock, Lock } from "../../icons";
import ValedateImage from "../../assets/images/validatore.png";

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
      <div className=" p-6">
        <Heading5 text={title} />
        <div>
          <p className="font-bold font-GBold text-[40px] text-primary-main">
            {precentage}
          </p>
          {subtitle ? (
            <p className="font-normal font-GRegular text-[12px] text-grey-grey1">
              {subtitle}
            </p>
          ) : (
            <p className="font-normal font-GRegular text-[12px] text-grey-grey1">
              Higher{" "}
              <span className="font-normal font-GBold text-[12px] text-white">
                daily
              </span>{" "}
              earning%
            </p>
          )}
        </div>
        <div className="bg-black flex justify-between px-3 py-1 gap-12 items-center mt-8 rounded-md">
          <div className="flex gap-2 items-center ">
            <div
              className="w-[26px] h-[20px] "
              style={{
                backgroundImage: `url(${LogoIcon})`,
              }}
            ></div>
            <p className="text-primary-main font-GBold font-bold text-[20px]">
              {amount}
            </p>
          </div>
          <p className="text-white font-GRegular font-normal text-[10px]">
            required
          </p>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-3 border border-[#AAAAAA] rounded-md items-center py-1 px-2">
            <Clock />
            <p className="font-normal font-GRegular text-[10px] text-white">
              no exparation
            </p>
          </div>
          <div className="flex gap-5 border border-[#AAAAAA] rounded-md items-center py-1 px-2">
            <Lock />
            <p className="font-normal font-GRegular text-[10px] text-white">
              168 hours
            </p>
          </div>
        </div>
        {stockNow && (
          <div className="bg-black flex justify-center items-center rounded-md mt-10 py-1">
            <p className="font-GBold font-bold text-[20px] text-primary-main">
              Stake now
            </p>
          </div>
        )}
      </div>
      {validators && (
        <div className="flex items-end gap-5">
          <div
            className="w-[143px] h-[106px]"
            style={{
              backgroundImage: `url(${ValedateImage})`,
            }}
          ></div>
          <div className="flex items-end h-fit">
            <p className="font-bold font-GBold text-[40px] text-white leading-10">
              {level}
            </p>
            <div>
              <p className="font-normal font-GRegular text-[12px] text-white pb-0 -mb-1">
                Level
              </p>
              <p className="font-normal font-GRegular text-[12px] text-white pt-0">
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
