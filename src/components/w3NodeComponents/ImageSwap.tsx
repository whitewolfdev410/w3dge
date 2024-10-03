import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../../icons";
import PureComponent from "../charts/SimpleRadialBarChart";
import CounterAnimation from "../animation/counterAnimation";
interface ImageSwapProps {
  boxViewData: any;
  onBoxSelect: (boxId: string) => void;
}

const ImageSwap: React.FC<ImageSwapProps> = ({ boxViewData, onBoxSelect }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

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
  console.log("here is boxview: ", boxViewData);

  return (
    <div className="flex flex-col items-center space-y-4 h-fit">
      {boxViewData && boxViewData.length > 0 ? (
        <>
          <div className=" flex justify-between gap-52 md:gap-96 mb-14">
            <div>
              <p className="font-normal font-GRegular text-[0.87rem] text-white">
                Box Identification
              </p>
              <p className="font-normal font-GRegular text-[1.43rem] text-white">
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
            {/* <div className="relative mt-8 md:mt-0 h-[11.25rem] w-[11.25rem] xl:hidden">
              <PureComponent />
              <div className="grid absolute top-[22%] left-[25%] justify-center w-[4.25rem]">
                <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mb-3">
                  Payout
                </p>
                <CounterAnimation
                  style="font-GBold font-bold text-[2.5rem] text-white text-center"
                  step={Math.floor(
                    boxViewData[currentIndex]?.total_income_per_box ?? 0
                  )}
                  countSteps={1}
                  duration={1000}
                />
                <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mt-3">
                  CDN
                </p>
              </div>
            </div> */}
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
              <div
                onClick={handlePrev}
                className="absolute top-[45%] -left-[0rem] xl:-left-[4.12rem] h-fit w-fit rounded-full  bg-primary-main cursor-pointer"
              >
                <ArrowLeft />
              </div>
              <div
                onClick={handleNext}
                className="absolute top-[45%]  -right-[0rem] xl:-right-[3.12rem] h-fit w-fit rounded-full bg-primary-main cursor-pointer"
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
          <div
            className={`py-3 rounded-md bg-primary-main -ml-2 cursor-pointer transition-all duration-300 ease-linear px-4`}
          >
            <p className="text-center font-bold font-GBold text-white text-[1.25rem]">
              Get W3DGE Box
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSwap;
