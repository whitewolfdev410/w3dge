import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../../icons";
import { ImageSwapData } from "../../assets/dataswap";

// Thailand2, Vietnam3, Singapore, Malaysia
// 7BXC
// 4DYZ
// 9HQA
// 2JPL

interface dataSwap {
  image: string;
  identification: string;
  location: string;
}
const images: dataSwap[] = ImageSwapData

const ImageSwap: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleNext = (): void => {
    if (isFading) return; // Prevent clicks during fade
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
      setIsFading(false);
    }, 500); // 500ms fade duration
  };

  return (
    <div className="flex flex-col items-center space-y-4 h-fit">
      <div className=" flex justify-between gap-52 md:gap-96 mb-14">
        <div>
          <p className="font-normal font-GRegular text-[0.87rem] text-white">
            Box Identification
          </p>
          <p className="font-normal font-GRegular text-[1.43rem] text-white">
            {images[currentIndex]?.identification}
          </p>
        </div>
        <div>
          <p className="font-normal font-GRegular text-[0.87rem] text-white">
            Location
          </p>
          <p className="font-normal font-GRegular text-[1.43rem] text-white">
            {images[currentIndex]?.location}
          </p>
        </div>
      </div>
      {/* Image with Fade Transition */}
      <div className="relative w-full h-52 flex justify-center">
        <div className="relative w-fit">
          <img
            src={images[currentIndex]?.image}
            alt={`Image ${currentIndex + 1}`}
            className={`w-80 h-full object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
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
    </div>
  );
};

export default ImageSwap;
