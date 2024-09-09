import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "../../icons";

const images: string[] = [
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Dw7-4lVfRq74_YEiPEt4e-bQ0_6UA2y73Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIz4qZKTOplGKCIt860B8HP3mTBMZGACNFg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAz57xpknUvRi6k3Ww2izWmCzJHcsOmV9bwQ&s",
];

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
    <div className="flex flex-col items-center space-y-4 ">
      <div className=" flex justify-between gap-52 md:gap-96 mb-16">
        <div>
          <p className="font-normal font-GRegular text-[14px] text-white">
            Box Identification
          </p>
          <p className="font-normal font-GRegular text-[23px] text-white">
            3AXD
          </p>
        </div>
        <div>
          <p className="font-normal font-GRegular text-[14px] text-white">
            Location
          </p>
          <p className="font-normal font-GRegular text-[23px] text-white">
            Thailand2
          </p>
        </div>
      </div>
      {/* Image with Fade Transition */}
      <div className="relative w-full h-52 flex justify-center">
        <div className="relative w-fit">
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className={`w-80 h-full object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          />

          <div
            onClick={handleNext}
            className="absolute top-[45%] -left-[50px] xl:-left-[130px] h-fit w-fit rounded-full  bg-primary-main cursor-pointer"
          >
            <ArrowLeft />
          </div>
          <div
            onClick={handleNext}
            className="absolute top-[45%]  -right-[50px] xl:-right-[130px] h-fit w-fit rounded-full bg-primary-main cursor-pointer"
          >
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSwap;
