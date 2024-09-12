import {
  Bodoy1,
  HeroHeading,
  HeroHeadingTwo,
} from "../../components/FontComponent";
import Earn from "../../components/dashboardComponent/Earn";
import WontToLearn from "../../components/footer/WontToLearn";
import PieChartComponent from "../../components/charts/PipChartComponent";
import PieChartContent from "../../components/dashboardComponent/pieChartContent";
import Earned from "../../components/dashboardComponent/Earned";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import LineChartComponent from "../../components/charts/lineChart";
import PureComponent from "../../components/charts/SimpleRadialBarChart";
import CounterAnimation from "../../components/animation/counterAnimation";

function Dashboard() {
  return (
    <div className="section-dashboard p-5 ">
      <div className="grid pt-4 md:pt-0">
        <HeroHeading text={"Cockpit"} />
      </div>
      <div className="row grid grid-cols-1 lg:grid-cols-[60%_40%] xl:grid-cols-[30%_40%_30%] justify-between pt-16">
        <div className="bg-contain bg-center bg-no-repeat relative hidden xl:grid h-fit pt-12">
          <div className="xl:pl-28">
            <HeroHeadingTwo text="Total Earning" />
            <div className="grid grid-cols-2 gap-x-0 gap-y-6 mt-5 justify-start">
              <Earn title="Today" amount={12} />
              <Earn title="This Week" amount={142} />
              <Earn title="This Month" amount={1242} />
            </div>
            <div className="flex justify-start pl-14">
              <div className="bg-dark-main  rounded-md py-3 px-14 flex justify-center transition-all duration-300 ease-linear mt-3 items-center w-fit text-primary-main cursor-pointer  hover:bg-primary-main hover:text-white">
                <p className="font-bold font-GBold text-[0.93rem]  hover:text-white">
                  Go to Wallet
                </p>
              </div>
            </div>
          </div>
          <div className="mt-40 -ml-8">
            <WontToLearn />
          </div>
        </div>
        <div className="">
          <div className="grid justify-center">
            <HeroHeadingTwo text="Validator Pools" />
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="w-[9.5rem] h-[9.5rem] grid relative">
              <PieChartComponent color="#00B649" />
              <PieChartContent amount={140.93} />
            </div>
            <div className="w-[9.5rem] h-[9.5rem] grid relative">
              <PieChartComponent color="#00B649" />
              <PieChartContent amount={240.43} />
            </div>
            <div className="w-[9.5rem] h-[9.5rem] grid relative">
              <PieChartComponent color="#949596" />
              <PieChartContent />
            </div>
            <div className="w-[9.5rem] h-[9.5rem] grid relative">
              <PieChartComponent color="#949596" />
              <PieChartContent />
            </div>
          </div>
          <div className="flex flex-wrap gap-12 justify-center  my-7 items-center">
            <Earned title="Total Earned" amount={14744} />
            <Earned title="Total Netork Share" amount={20.1} tagText="%" />
            <div className="bg-dark-main w-[10.43rem] py-3 h-fit transition-all duration-300 ease-linear justify-center rounded-lg cursor-pointer text-primary-main hover:bg-primary-main hover hover:text-white">
              <p className="font-bold font-GBold text-[0.93rem] text-center">
                Claim Reward
              </p>
            </div>
          </div>
          <div className="flex gap-7 mt-16 flex-wrap justify-center xl:gap-7 xl:justify-center">
            <div className="w-[17rem] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Preformance 2" style={"!pb-3"} />
              <StokedBorChartComponent />
            </div>
            <div className="w-[17rem] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Preformance" style={"!pb-3"} />
              <LineChartComponent />
            </div>
          </div>
        </div>
        <div className="pt-12 flex justify-center ">
          <div className="w-fit">
            <div className="grid justify-start w-full mt-10 lg:mt-0">
              <HeroHeadingTwo text="3dge Box " />
            </div>
            <div className="flex row gap-5 xl:gap-10 w-full justify-start">
              <div className="h-[12.5rem] w-[12.5rem] relative ">
                <PureComponent />
                <div className="grid w-fit absolute top-[2.65rem] left-[2.65rem]">
                  <p className="font-GRegular font-normal text-[0.75rem] text-white text-end -mb-3">
                    {" "}
                    Payout
                  </p>
                  <CounterAnimation
                    style="font-GBold font-bold text-[2.5rem] text-white"
                    step={9.3}
                    countSteps={1}
                    duration={1000}
                  />
                  <p className="font-GRegular font-normal text-[0.75rem] text-white text-end -mt-3">
                    CDN
                  </p>
                </div>
              </div>
              <div>
                <Earned
                  title="Box Identification"
                  amount={320}
                  showPrecentage={false}
                  dgeBox
                  tagText="AXD"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 xl:gap-10">
              <Earned title="Active Validators" amount={14744} dgeBox />
              <Earned title="Total Bandwidth" amount={14744} dgeBox />
              <Earned title="Resold Bandwidth " amount={14744} dgeBox />
              <Earned title="Distributed Bandwidth" amount={14744} dgeBox />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-contain bg-center bg-no-repeat relative grid xl:hidden mt-16">
        <HeroHeadingTwo text="Total Earning" />
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 mt-5">
          <Earn title="Today" amount={12} />
          <Earn title="This Week" amount={142} />
          <Earn title="This Month" amount={1242} />
        </div>
        <div className="bg-dark-main rounded-md py-2 px-7 flex justify-center transition-all duration-300 ease-linear mt-3 items-center w-fit text-primary-main cursor-pointer  hover:bg-primary-main hover:text-white">
          <p className="font-bold font-GBold text-[0.93rem]  hover:text-white">
            Go to Wallet
          </p>
        </div>
        <div className="mt-16">
          <WontToLearn />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
