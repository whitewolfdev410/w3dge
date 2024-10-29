import { Heading5 } from "../FontComponent";
import LogoIcon from "../../assets/images/logo.png";
import { Clock, Lock } from "../../icons";
import ValedateImage from "../../assets/images/validatore.png";
import Tooltip from "../Tooltip";
import CounterAnimation from "../animation/counterAnimation";
import PieChartComponent from "../charts/PipChartComponent";
import PieChartContent from "../dashboardComponent/pieChartContent";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast functions
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import CounterAnimationWithInput from "../animation/counterAnimationWithInput";
import axios from "axios";
import { setPendingUnstake, setUserData } from "../../context/boxDataSlice";
import { useDispatch } from "react-redux";
import PrimaryLogo from "../../assets/images/logo-chart-primary.png";

interface IPropsBoostPayout {
  title: string;
  percentage: any;
  subtitle?: string;
  amount: string;
  stockNow?: boolean;
  validators: boolean;
  level?: string;
  is_piechart?: boolean;
  earned?: any;
  pendingUnstake?: any;
  setIsStaked?: any;
}

function BoostPayout({
  amount,
  percentage,
  title,
  validators,
  stockNow,
  subtitle,
  level,
  is_piechart,
  earned,
  pendingUnstake,
  setIsStaked,
}: IPropsBoostPayout) {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredSec, setIsHoveredSec] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [handleStaked, setHandleStaked] = useState(false);
  const [handleUnStaked, setHandleUnstaked] = useState(false);
  const getStepBasedOnPercentage = (percentage: any) => {
    switch (parseInt(percentage)) {
      case 2:
        return 500;
      case 3:
        return 800;
      case 5:
        return 1000;
      case 10:
        return 2000;
      default:
        return 0; // Default to amount if no specific percentage is matched
    }
  };
  const [timeRemaining, setTimeRemaining] = useState("");
  const [inputValue, setInputValue] = useState<number>(
    getStepBasedOnPercentage(percentage)
  );
  const [increaseValue, setIncreaseValue] = useState<number>(0);
  const handleIncreaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setIncreaseValue(value ? parseFloat(value) : 0);
  };
  const matchingUnstake = pendingUnstake
    ? pendingUnstake.find((item: any) => item.pool_id == percentage)
    : null;
  let unstakeDate = matchingUnstake
    ? new Date(matchingUnstake.unstake_date)
    : null;

  useEffect(() => {
    if (!unstakeDate) {
      unstakeDate = new Date();
      setTimeRemaining("07:00:00:00");
      return;
    }
    const lastUpdateDate = new Date(unstakeDate);
    const calculateTimeRemaining = () => {
      const today = new Date();
      const timeDifference = today.getTime() - lastUpdateDate.getTime();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      if (timeDifference <= sevenDaysInMs) {
        const remainingTime = sevenDaysInMs - timeDifference;
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setTimeRemaining(
          `${String(days).padStart(2, "0")}:${String(hours).padStart(
            2,
            "0"
          )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );
      } else {
        setTimeRemaining("00:00:00:00");
      }
    };
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, [unstakeDate]);
  const { address } = useAccount();
  const dispatch = useDispatch();
  const handleUnstake = async (percentage: any) => {
    setHandleUnstaked(true);
    const apiUrl =
      "https://gygxr53i33.execute-api.ap-southeast-2.amazonaws.com/Prod/unstake";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get the user's timezone
    const data = {
      wallet_id: address,
      pool_id: percentage,
      time_zone: timeZone,
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Error to unstake: ${response.status} ${response.statusText}`
        );
      }
      toast.success("Unstake successful!");
      handleGetUserData();
      setIsLocked(true);
      setHandleUnstaked(false);
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
      setHandleUnstaked(false);
    }
  };
  const parseResponseBody = (responseBody: any) => {
    try {
      return typeof responseBody === "string"
        ? JSON.parse(responseBody)
        : responseBody;
    } catch (e) {
      console.error("Error parsing response data:", e);
      return null;
    }
  };
  const fetchDataFromAWS = async (path: string, query = {}) => {
    try {
      const apiUrl = import.meta.env.VITE_AWS_API_URL;
      const { data } = await axios.post(apiUrl, {
        path: `w3dgeData/${path}`,
        operation: "find",
        query,
      });
      return parseResponseBody(data.body);
    } catch (err) {
      console.error(`Error fetching data from ${path}:`, err);
      return null;
    }
  };
  const handleGetUserData = async () => {
    const pendingUnstakeData = await fetchDataFromAWS("PendingUnstake", {
      wallet_address: address,
    });
    dispatch(setPendingUnstake(pendingUnstakeData));
    const userData = await fetchDataFromAWS("UserData", {
      wallet_address: address,
    });
    dispatch(
      setUserData(
        userData?.[0] || {
          staking_pools: [
            {
              pool_type: "2%",
              amount_locked: 0,
              reward_earned: 0,
            },
            {
              pool_type: "3%",
              amount_locked: 0,
              reward_earned: 0,
            },
            {
              pool_type: "5%",
              amount_locked: 0,
              reward_earned: 0,
            },
            {
              pool_type: "10%",
              amount_locked: 0,
              reward_earned: 0,
            },
          ],
        }
      )
    );
  };
  const handleIncreaseStake = async (percentage: any) => {
    setInputValue(increaseValue);
    handleStake(percentage);
  };
  const handleStake = async (percentage: any) => {
    setHandleStaked(true);
    let stakeAmount = getStepBasedOnPercentage(percentage);
    if (inputValue < stakeAmount) {
      toast.error("Amount " + stakeAmount + " is minimum required value");
      setHandleStaked(false);
      return false;
    }
    const apiUrl =
      "https://gygxr53i33.execute-api.ap-southeast-2.amazonaws.com/Prod/ButtonStake";
    const data = {
      wallet_id: address,
      pool_id: percentage,
      value: inputValue,
    };
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        toast.error("Error to stake: " + jsonResponse);
      } else {
        toast.success("Staking successful!");
        setIsStaked(true);
      }
      setHandleStaked(false);
      handleGetUserData();
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
      setTimeout(() => setHandleStaked(false), 3000);
    }
  };

  const handleValueChange = (value: number) => {
    setInputValue(value);
  };
  function HoveredComponent(data: any) {
    return (
      <>
        <div
          className={`bg-[#00551899] p-2 rounded-full shadow-lg text-center absolute justify-center items-center w-[7rem] h-[7rem] flex ${
            handleUnStaked
              ? "unstake-loading top-[41%] left-[41%]"
              : " top-[1.45rem] left-[1.4rem]"
          }`}
          style={{
            background:
              "linear-gradient(to top, rgba(0, 85, 24, 0.6), rgba(0, 187, 53, 0.6))",
          }}
          onClick={() => handleUnstake(data.percentage)}
        >
          <p className="font-bold font-GBold text-[1rem] text-white ">
            {handleUnStaked ? "" : "Unstake Now"}
          </p>
        </div>
        <div className="absolute bottom-[0rem] right-[-3rem]">
          <div className="flex gap-1 border border-[#AAAAAA] rounded-md items-center py-1 w-[4rem] cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-main hover:border-primary-main px-1">
            <Clock style={{ width: "1.5rem", margin: "auto" }} />
            <p className="font-normal font-GRegular text-[0.52rem] text-white">
              7 Days
            </p>
          </div>
        </div>
      </>
    );
  }

  function LockedContent() {
    return (
      <div
        className="absolute top-[3.2rem] left-[2.5rem] flex flex-col justify-center "
        style={{ minWidth: "45px" }}
      >
        <Clock style={{ width: "1.5rem", margin: "auto" }} />
        <p className="font-bold font-GBold text-[0.93rem] text-[#BABABA] text-center">
          {timeRemaining}
        </p>
        <p className="font-bold font-GBold text-[0.62rem] text-[#767676] text-center">
          Unlocking
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-cover bg-center bg-no-repeat  rounded-xl md:w-[19rem] w-[24rem]"
      style={{
        background:
          "linear-gradient(0deg, rgba(26,26,26,1) 0%, rgba(26,26,26,1) 100%)",
      }}
    >
      <div
        className="p-9"
        style={{ paddingBottom: is_piechart ? 0 : "2.8rem" }}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <div className="flex justify-between gap-8">
          <div>
            <Heading5 text={is_piechart ? "Your Share" : title} />
            <CounterAnimation
              style="font-bold font-GBold text-[2.5rem] text-primary-main"
              step={parseInt(percentage)}
              countSteps={0.3}
              duration={500}
              tagText="%"
            />
            {subtitle ? (
              <p
                className="font-normal font-GRegular text-[0.75rem] text-grey-grey1"
                dangerouslySetInnerHTML={{
                  __html: subtitle.replace("reward", "<br/>reward"),
                }}
              />
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
                <Heading5 text={"Earned"} />
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
          <div
            className="w-[9.5rem] h-[9.5rem] grid relative mx-auto cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <PieChartComponent color={"#00B649"} />
            {(pendingUnstake &&
              pendingUnstake.some((item: any) => item.pool_id == percentage)) ||
            isLocked ? (
              <LockedContent />
            ) : isHovered ? (
              <HoveredComponent percentage={percentage} />
            ) : (
              <>
                <PieChartContent amount={amount} title="Unstake" />
              </>
            )}
          </div>
        ) : (
          <>
            <div className="bg-black flex justify-between px-3 py-1 gap-12 items-center mt-8 rounded-md">
              <div className="flex gap-2 items-center w-[100%]">
                <div
                  className="w-[5.62rem] h-[1.25rem]"
                  style={{
                    backgroundImage: `url(${LogoIcon})`,
                  }}
                ></div>

                <CounterAnimationWithInput
                  style="text-primary-main font-GBold font-bold text-[1.25rem] w-[100%]"
                  step={getStepBasedOnPercentage(percentage)}
                  countSteps={10}
                  duration={5000}
                  tagText=" items"
                  onValueChange={handleValueChange} // Pass the callback function
                />
              </div>
              <p className="text-white font-GRegular font-normal text-[0.62rem]">
                required
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <Tooltip text="details">
                <div className="flex gap-3 border border-[#AAAAAA] rounded-md items-center py-1 px-2 cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-main hover:border-primary-main">
                  <Clock />
                  <p className="font-normal font-GRegular text-[0.62rem] text-white pr-8">
                    7 Days
                  </p>
                </div>
              </Tooltip>
              <Tooltip text="details" handleStaked={handleStaked}>
                <div
                  className={`flex gap-5 border border-[#AAAAAA] rounded-md items-center py-1 px-2 pr-6 cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-main hover:border-primary-main ${
                    handleStaked ? "stake-loading" : ""
                  }`}
                  onClick={() => handleStake(percentage)}
                >
                  <Lock />
                  <p className="font-normal font-GRegular text-[0.62rem] text-white pr-6">
                    {handleStaked ? "" : "Stake"}
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
          <div className="w-full grid justify-center pl-[3rem]">
            {is_piechart && (
              <div className="w-full">
                <p className="font-normal font-GRegular text-[0.75rem] text-white pb-1 text-end">
                  {isHoveredSec ? "Press send" : "Increase Stake"}
                </p>
                <div
                  className="flex gap-1 border border-[#AAAAAA] rounded-md items-center py-1 w-[6.5rem] cursor-pointer transition-all duration-300 ease-linear px-1"
                  onMouseEnter={() => setIsHoveredSec(true)}
                  onMouseLeave={() => setIsHoveredSec(false)}
                >
                  <img
                    src={PrimaryLogo}
                    style={{ width: "1.87rem", margin: "auto" }}
                    onClick={() => handleIncreaseStake(percentage)}
                  />
                  <input
                    className="text-white font-GBold font-bold text-[1.25rem] w-[3.5rem] bg-transparent"
                    type="number"
                    onChange={handleIncreaseChange}
                  />
                </div>
              </div>
            )}
            <div className="flex items-end h-fit">
              <CounterAnimation
                style="font-bold font-GBold text-[2.5rem] text-white leading-10"
                step={level}
                countSteps={1}
                duration={300}
              />
              <div className="pl-1">
                <p className="font-normal font-GRegular text-[0.75rem] text-white pb-0 -mb-1">
                  Level
                </p>
                <p className="font-normal font-GRegular text-[0.75rem] text-white pt-0">
                  Validator
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoostPayout;
