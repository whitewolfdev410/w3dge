import BackgroundImage from "../../assets/images/footer_learn.png";
import { QuestionMark } from "../../icons";
import { Heading5 } from "../FontComponent";

function WontToLearn() {
  return (
    <div
      className="w-fit  p-5 bg-cover bg-current bg-no-repeat"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <div className="bg-white w-9 h-9 rounded-xl flex justify-center items-center mb-7">
        <QuestionMark />
      </div>
      <Heading5 text="Want to learn more?" style="!font-bold" />

      <p className="font-thin font-GRegular text-white text-sm mb-5 mt-1">
        Check out our Whitepaper
      </p>
      <div className="flex px-16 py-4 cursor-pointer bg-[#0F2806] justify-center items-center rounded-xl hover:bg-primary-main transition-all duration-300 ease-linear">
        <p className="font-GBold font-bold text-sm text-white">DOCUMENTATION</p>
      </div>
    </div>
  );
}

export default WontToLearn;
