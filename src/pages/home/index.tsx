import { Heading1, HeroHeading } from "../../components/FontComponent";
import Distribution from "../../components/homeComponents/Distribution";
import BackgroundImage from "../../assets/images/home-icon.png";
import DailyPayouts from "../../components/homeComponents/DailyPayouts";
import Footer from "../../components/footer";
import AutoScrollContainer from "../../components/animation/AutoScrollContainer";
import { HomeData } from "../../assets/constant";

const blinkingPoints = [
  {
    x: "right-[298px]",
    y: "top-[180px]",
  },
  {
    x: "right-[332px]",
    y: "top-[198px]",
  },
  {
    x: "right-[420px]",
    y: "top-[190px]",
  },
  {
    x: "right-[205px]",
    y: "top-[147px]",
  },
  {
    x: "right-[236px]",
    y: "top-[172px]",
  },
  {
    x: "right-[256px]",
    y: "top-[172px]",
  },
  {
    x: "right-[256px]",
    y: "top-[188px]",
  },
  {
    x: "right-[280px]",
    y: "top-[172px]",
  },
  {
    x: "right-[280px]",
    y: "top-[216px]",
  },
  {
    x: "right-[280px]",
    y: "top-[258px]",
  },
  {
    x: "right-[230px]",
    y: "top-[258px]",
  },
];

function HomePage() {
  return (
    <div className="section-home p-5 ">
      <div className="grid ">
        <HeroHeading text={"Network"} />
      </div>
      <div className="block pt-16">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_60%_20%] ">
          <div className=" mt-20 mb-16 p-3">
            <Heading1 text="Distribution" />
            <Distribution width="w-[50%]" amount="50%" name="Vietnam" />
            <Distribution width="w-[40%]" amount="40%" name="Thailand" />
            <Distribution width="w-[30%]" amount="30%" name="Malaysia" />
            <Distribution width="w-[20%]" amount="20%" name="China" />
            <Distribution width="w-[10%]" amount="10%" name="Philippines " />
            <Distribution width="w-[0%]" amount="0%" name="Singapore" />
          </div>
          <div
            className="w-full h-[31.25rem] bg-contain bg-center bg-no-repeat relative "
            style={{
              backgroundImage: `url(${BackgroundImage})`,
            }}
          >
            {blinkingPoints?.map((item) => (
              <div
                key={item?.x + item?.y}
                className={`blinking-point absolute ${item?.y} ${item?.x} z-10`}
              ></div>
            ))}
          </div>
          <div className="relative h-fit mt-20">
            <Heading1 text="Daily Payouts" />
            <AutoScrollContainer>
              <div className="scroll-container p-3 relative">
                {HomeData?.map((item) => (
                  <DailyPayouts key={item?.id} item={item} />
                ))}
              </div>
            </AutoScrollContainer>

            <div className="opacity-55 absolute bottom-14 left-0 right-[0.62rem] h-14 z-10 bg-[#000]"></div>
          </div>
        </div>
      </div>
      <div className="grid pr-12">
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
