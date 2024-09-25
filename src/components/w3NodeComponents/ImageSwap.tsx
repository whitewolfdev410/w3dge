import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../../icons";
interface ImageSwapProps {
  boxViewData: any; 
  onBoxSelect: (boxId: string) => void;
}

const ImageSwap: React.FC<ImageSwapProps> = ({boxViewData, onBoxSelect}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleNext = (): void => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      const newIndex = currentIndex === boxViewData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      onBoxSelect(boxViewData[newIndex].box_id); // Send box_id to parent component
      setIsFading(false);
    }, 500); // 500ms fade duration
  };


  return (
    <div className="flex flex-col items-center space-y-4 h-fit">
      {boxViewData && (
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

      )}
      {boxViewData && (
        <div className="relative w-full h-52 flex justify-center">
          <div className="relative w-fit">
          <video
            src='/src/assets/boxVideo.mp4'
            className={`w-80 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
            autoPlay
            loop
            muted
          />
            <div
              onClick={handleNext}
              className="absolute top-[45%] -left-[3.12rem] xl:-left-[8.12rem] h-fit w-fit rounded-full  bg-primary-main cursor-pointer"
            >
              <ArrowLeft />
            </div>
            <div
              onClick={handleNext}
              className="absolute top-[45%]  -right-[3.12rem] xl:-right-[8.12rem] h-fit w-fit rounded-full bg-primary-main cursor-pointer"
            >
              <ArrowRight />
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default ImageSwap;
