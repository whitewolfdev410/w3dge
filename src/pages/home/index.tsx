import { Heading1, HeroHeading } from "../../components/FontComponent";
import Distribution from "../../components/homeComponents/Distribution";
import BackgroundImage from "../../assets/images/home-icon.png";
import DailyPayouts from "../../components/homeComponents/DailyPayouts";
import Footer from "../../components/footer";
import AutoScrollContainer from "../../components/animation/AutoScrollContainer";

function HomePage() {
  return (
    <div className="section-home p-5 ">
      <div className="grid pt-4 md:pt-0">
        <HeroHeading text={"Network"} />
      </div>
      <div className="block">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_60%_20%] ">
          <div className=" mt-16 mb-16 p-3">
            <Heading1 text="Distribution" />
            <Distribution width="w-[50%]" amount="50%" name="Vietnam" />
            <Distribution width="w-[40%]" amount="40%" name="Thailand" />
            <Distribution width="w-[30%]" amount="30%" name="Malaysia" />
            <Distribution width="w-[20%]" amount="20%" name="China" />
            <Distribution width="w-[10%]" amount="10%" name="Philippines " />
            <Distribution width="w-[0%]" amount="0%" name="Singapore" />
          </div>
          <div
            className="w-full h-[500px] bg-cover bg-center bg-no-repeat "
            style={{
              backgroundImage: `url(${BackgroundImage})`,
            }}
          ></div>
          <div className="relative h-fit mt-14">
            <Heading1 text="Daily Payouts" />
            <AutoScrollContainer>
              <div className="scroll-container   p-3 relative">
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
                <DailyPayouts />
              </div>
            </AutoScrollContainer>

            <div className="opacity-55 absolute bottom-14 left-0 right-[10px] h-14 z-10 bg-[#000]"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
