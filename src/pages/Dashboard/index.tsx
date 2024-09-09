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
      <div className="row grid grid-cols-1 lg:grid-cols-[60%_40%] xl:grid-cols-[25%_50%_25%] justify-between mt-14">
        <div className="bg-contain bg-center bg-no-repeat relative hidden xl:grid h-fit ">
          <HeroHeadingTwo text="Total Earning" />
          <div className="grid grid-cols-2 gap-x-2 gap-y-6 mt-5 justify-start">
            <Earn title="Today" amount={12} />
            <Earn title="This Week" amount={142} />
            <Earn title="This Month" amount={1242} />
          </div>
          <div className="bg-dark-main rounded-md py-2 px-7 flex justify-center transition-all duration-300 ease-linear mt-3 items-center w-fit text-primary-main cursor-pointer  hover:bg-primary-main hover:text-white">
            <p className="font-bold font-GBold text-[15px]  hover:text-white">
              Go to Wallet
            </p>
          </div>
          <div className="mt-16">
            <WontToLearn />
          </div>
        </div>
        <div className=" lg:pr-14">
          <HeroHeadingTwo text="Validator Pools" />
          <div className="flex flex-wrap justify-start">
            <div className="w-[140px] h-[140px] grid relative">
              <PieChartComponent color="#00B649" />
              <PieChartContent amount={140.93} />
            </div>
            <div className="w-[140px] h-[140px] grid relative">
              <PieChartComponent color="#00B649" />
              <PieChartContent amount={240.43} />
            </div>
            <div className="w-[140px] h-[140px] grid relative">
              <PieChartComponent color="#949596" />
              <PieChartContent />
            </div>
            <div className="w-[140px] h-[140px] grid relative">
              <PieChartComponent color="#949596" />
              <PieChartContent />
            </div>
          </div>
          <div className="flex gap-16 my-16 flex-wrap ">
            <Earned title="Total Earned" amount={14744} />
            <Earned title="Total Netork Share" amount={20.1} tagText="%" />
            <div className="bg-dark-main px-5 py-3 h-fit flex-1 transition-all duration-300 ease-linear justify-center rounded-lg cursor-pointer text-primary-main hover:bg-primary-main hover hover:text-white">
              <p className="font-bold font-GBold text-[15px] text-center">
                Claim Reward
              </p>
            </div>
          </div>
          <div className="flex gap-10 mt-20 flex-wrap justify-center">
            <div className="w-[320px] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Preformance 2" style={"!pb-3"} />
              <StokedBorChartComponent />
            </div>
            <div className="w-[320px] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Preformance" style={"!pb-3"} />
              <LineChartComponent />
            </div>
          </div>
        </div>
        <div className=" ">
          <div className="grid justify-start w-full mt-10 lg:mt-0">
            <HeroHeadingTwo text="3dge Box " />
          </div>
          <div className="flex row gap-5 xl:gap-10 w-full justify-start">
            <div className="h-[180px] w-[180px] relative ">
              <PureComponent />
              <div className="grid w-fit absolute top-[50px] left-[60px]">
                <p className="font-GRegular font-normal text-[12px] text-white text-end">
                  {" "}
                  Payout
                </p>
                <CounterAnimation
                  style="font-GBold font-bold text-5xl text-white"
                  step={9.3}
                  countSteps={1}
                  duration={1000}
                />
                <p className="font-GRegular font-normal text-[12px] text-white text-end">
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
      <div className="bg-contain bg-center bg-no-repeat relative grid xl:hidden mt-16">
        <HeroHeadingTwo text="Total Earning" />
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 mt-5">
          <Earn title="Today" amount={12} />
          <Earn title="This Week" amount={142} />
          <Earn title="This Month" amount={1242} />
        </div>
        <div className="bg-dark-main rounded-md py-2 px-7 flex justify-center transition-all duration-300 ease-linear mt-3 items-center w-fit text-primary-main cursor-pointer  hover:bg-primary-main hover:text-white">
          <p className="font-bold font-GBold text-[15px]  hover:text-white">
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
