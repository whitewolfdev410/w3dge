import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import WontToLearn from "../../components/footer/WontToLearn";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import TabMain from "../../components/tabs";

function Validators() {
  return (
    <div className="section-validators p-5 ">
      <div className="grid pt-4 md:pt-0 ">
        <HeroHeading text={"Validator Pools"} />
      </div>
      <div className="block pt-16">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_70%_10%] ">
          <div className="h-full w-full relative"></div>
          <div className="flex gap-5 flex-wrap justify-center xl:justify-between">
            <BoostPayout
              title="Network share"
              precentage="2%"
              amount="10.000"
              stockNow={false}
              subtitle="for Validator reward"
              validators
              level="1"
            />
            <BoostPayout
              title="Network share"
              precentage="3%"
              amount="20.000"
              stockNow={false}
              subtitle="for Validator reward"
              validators
              level="2"
            />
            <BoostPayout
              title="Network share"
              precentage="5%"
              amount="40.000"
              stockNow={false}
              subtitle="for Validator reward"
              validators
              level="3"
            />
            <BoostPayout
              title="Network share"
              precentage="10%"
              amount="100.000"
              stockNow={false}
              subtitle="for Validator reward"
              validators
              level="4"
            />
          </div>
          <div className="h-full w-full relative "></div>
        </div>
      </div>
      <div className="  mt-32 grid grid-cols-1 xl:grid-cols-[20%_70%_10%]">
        <div className="hidden  xl:grid items-center">
          <WontToLearn />
        </div>
        <div className="flex gap-5 flex-wrap justify-center xl:justify-between">
          <div className="w-80 h-72 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance 2" style={"!pb-3"} />
            <StokedBorChartComponent />
          </div>
          <div className="w-[29rem] h-72 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance" style={"!pb-3"} />
            <LineChartComponent />
          </div>
          <TabMain />
        </div>
        <div></div>
      </div>
      <div className="grid">
        <div className="grid  xl:hidden items-center mt-10 mx-auto">
          <WontToLearn />
        </div>
      </div>
    </div>
  );
}

export default Validators;
