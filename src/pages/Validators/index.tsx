import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import WontToLearn from "../../components/footer/WontToLearn";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import TabMain from "../../components/tabs";
import { ValidatorsData } from "../../assets/validatordata";

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
            {ValidatorsData.map((item) => (
              <BoostPayout
                title={item.title}
                precentage={item.percentage}
                amount={item.amount}
                stockNow={false}
                subtitle={item.subtitle}
                validators
                level={item.level}
              />
            ))}
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
