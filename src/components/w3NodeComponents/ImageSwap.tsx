import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../../icons";
import PureComponent from "../charts/SimpleRadialBarChart";
import CounterAnimation from "../animation/counterAnimation";
import CounterAnimationWithInput from "../animation/counterAnimationWithInput";
import LogoIcon from "../../assets/images/logo.png";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
interface ImageSwapProps {
  boxViewData: any;
  onBoxSelect: (boxId: string) => void;
  networkStats: any;
  isLoadingNet: boolean;
}

const ImageSwap: React.FC<ImageSwapProps> = ({
  boxViewData,
  onBoxSelect,
  networkStats,
  isLoadingNet,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setInputValue(value);
  };
  const { address } = useAccount();
  const handleSubmit = async () => {
    setIsClicked(true);
    let data = {
      identifier_code: inputValue,
      wallet_address: address,
    };
    console.log("here is handle clicked::", data);
    const apiUrl =
      "https://gygxr53i33.execute-api.ap-southeast-2.amazonaws.com/Prod/Activate";
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
        toast.error("Error to activate: " + jsonResponse.error);
      } else {
        toast.success(jsonResponse);
      }
      setTimeout(() => setIsClicked(false), 3000);
    } catch (error: any) {
      toast.error(`An error occurred: ${error.message}`);
      setTimeout(() => setIsClicked(false), 3000);
    }
  };

  const handleNext = (): void => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      const newIndex =
        currentIndex === boxViewData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      onBoxSelect(boxViewData[newIndex].box_id); // Send box_id to parent component
      setIsFading(false);
    }, 500); // 500ms fade duration
  };
  const handlePrev = (): void => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      let newIndex = 0;
      if (currentIndex == 0) {
        newIndex = boxViewData.length - 1;
      } else {
        newIndex =
          currentIndex === boxViewData.length - 1 ? 0 : currentIndex - 1;
      }
      setCurrentIndex(newIndex);
      onBoxSelect(boxViewData[newIndex].box_id); // Send box_id to parent component
      setIsFading(false);
    }, 500); // 500ms fade duration
  };

  return (
    <div className="flex flex-col items-center space-y-4 h-fit">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {boxViewData && boxViewData.length > 0 ? (
        <>
          <div className=" flex justify-between gap-52 md:gap-96 mb-0 md:mb-14">
            <div>
              <p className="font-normal font-GRegular text-[0.87rem] text-white">
                Box Identification
              </p>
              <p
                className="font-normal font-GRegular text-[1.43rem] text-white"
                style={{ maxWidth: "13rem", overflowWrap: "break-word" }}
              >
                {boxViewData[currentIndex]?.box_id}
              </p>
            </div>
            <div>
              <p className="font-normal font-GRegular text-[0.87rem] text-white">
                Location
              </p>
              <p className="font-normal font-GRegular text-[1.43rem] text-white">
                {boxViewData[currentIndex]?.location}
              </p>
            </div>
          </div>
          <div className="relative w-full h-52 flex justify-center">
            <div className="relative mt-0 h-[11.25rem] w-[11.25rem] xl:hidden">
              <PureComponent />
              <div className="grid absolute top-[22%] left-[25%] justify-center w-[4.25rem]">
                <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mb-3">
                  Payout
                </p>
                {!isLoadingNet && (
                  <CounterAnimation
                    style="font-GBold font-bold text-[2.5rem] text-white text-center"
                    step={Math.floor(networkStats?.average_daily_revenue ?? 0)}
                    countSteps={1}
                    duration={1000}
                  />
                )}
                <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mt-3">
                  CDN
                </p>
              </div>
            </div>
            <div className="relative lg:w-fit w-[60%]">
              <video
                src="/src/assets/boxVideo.mp4"
                className={`w-80 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
                style={{ width: "30rem" }}
                autoPlay
                loop
                muted
              />
              <div
                onClick={handlePrev}
                className="absolute md:top-[45%] top-[30%] -left-[0rem] xl:-left-[4.12rem] h-fit w-fit rounded-full  bg-primary-main cursor-pointer"
              >
                <ArrowLeft />
              </div>
              <div
                onClick={handleNext}
                className="absolute md:top-[45%] top-[30%]  -right-[0rem] xl:-right-[3.12rem] h-fit w-fit rounded-full bg-primary-main cursor-pointer"
              >
                <ArrowRight />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative w-full h-70 flex justify-center">
            <div className="relative w-fit">
              <video
                src="/src/assets/boxVideo.mp4"
                className={`w-80 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
                  isFading ? "opacity-0" : "opacity-100"
                }`}
                style={{ width: "30rem" }}
                autoPlay
                loop
                muted
              />
            </div>
          </div>
          <div className="bg-black flex justify-between px-3 py-1 gap-12 items-center mt-8 rounded-md">
            <div className="flex gap-2 items-center w-[100%]">
              <div
                className="w-[1.62rem] h-[1.25rem]"
                style={{
                  backgroundImage: `url(${LogoIcon})`,
                  backgroundRepeat: "no-repeat", // Prevent the background image from repeating
                  backgroundSize: "contain", // Adjusts the image to fit within the element
                }}
              ></div>
              <input
                className="text-primary-main font-GBold font-bold text-[1.25rem] w-[100%]"
                type="text"
                onChange={handleValueChange} // Pass the callback function
              />
            </div>
            <p className="text-white font-GRegular font-normal text-[0.62rem]">
              required
            </p>
          </div>

          <div
            className={` ${
              isClicked
                ? "stake-loading"
                : "py-3 rounded-md bg-primary-main -ml-2 cursor-pointer transition-all duration-300 ease-linear px-4"
            } `}
          >
            <p
              className={`text-center font-bold font-GBold text-white text-[1.25rem]`}
              onClick={handleSubmit}
            >
              {isClicked ? "" : "Activate"}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSwap;
