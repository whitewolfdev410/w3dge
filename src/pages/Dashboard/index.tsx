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
import PureComponent from "../../components/charts/SimpleRadialBarChart";
import CounterAnimation from "../../components/animation/counterAnimation";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "../../icons";
import EarnedWithString from "../../components/dashboardComponent/EarnedWithString";
import LinePayoutChartComponent from "../../components/charts/linePayoutChart";
import StokedPayoutBorChartComponent from "../../components/charts/stackedPayoutBarChart";
import { useSelector } from "react-redux";

function Dashboard() {
  const { address } = useAccount();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [selectedBoxData, setSelectedBoxData] = useState<any>();
  const [isLoadingNet, setIsLoadingNet] = useState<boolean>(true);
  const [networkStats, setNetworkStats] = useState<any>();
  const { userData, validatorPayoutdata, boxViewData, isLoading } = useSelector(
    (state: any) => state.boxData
  );
  const [validatorCount, setValidatorCount] = useState<number>(0);
  const parseResponseBody = (responseBody: any) => {
    try {
      return typeof responseBody === "string"
        ? JSON.parse(responseBody)
        : responseBody;
    } catch (e) {
      console.error("Error parsing response data:", e);
      return null;
    }
  };
  const fetchDataFromAWS = async (path: string, query = {}) => {
    try {
      const apiUrl = import.meta.env.VITE_AWS_API_URL;
      const { data } = await axios.post(apiUrl, {
        path: `w3dgeData/${path}`,
        operation: "find",
        query,
      });
      return parseResponseBody(data.body);
    } catch (err) {
      console.error(`Error fetching data from ${path}:`, err);
      return null;
    }
  };
  const handleBoxSelect = async (boxId: string) => {
    setIsLoadingNet(true);
    const boxViewRes = await fetchDataFromAWS("BoxView", {
      box_id: boxId,
      wallet_address: address,
    });
    setNetworkStats({
      average_daily_revenue: boxViewRes?.[0]?.average_daily_income,
      total_bandwidth: boxViewRes?.[0]?.total_bandwidth,
      total_bandwidth_daily: boxViewRes?.[0]?.total_bandwidth
        ? boxViewRes?.[0]?.total_bandwidth * 0.1
        : 0,
      unique_validator_count: boxViewRes?.[0]?.uptime_in_days
        ? boxViewRes?.[0]?.uptime_in_days * 24
        : 0,
      total_earnings: boxViewRes?.[0]?.total_income_per_box,
    });
    setIsLoadingNet(false);
    setValidatorCount(
      boxViewRes?.[0]?.uptime_in_days ? boxViewRes?.[0]?.uptime_in_days * 24 : 0
    );
  };
  console.log("validatorCount:::", validatorCount);
  useEffect(() => {
    if (boxViewData) {
      handleBoxSelect(boxViewData[0]?.box_id);
      setSelectedBoxData(boxViewData[0]);
    }
  }, [boxViewData]);

  const handleNext = (): void => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      const newIndex =
        currentIndex === boxViewData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedBoxData(boxViewData[newIndex]); // Send box_id to parent component
      handleBoxSelect(boxViewData[newIndex].box_id);
      setIsFading(false);
    }, 500); // 500ms fade duration
  };
  console.log("networkStats:::", networkStats);
  return (
    <div className="section-dashboard p-5 ">
      <div className="grid pt-4 md:pt-0 hidden xl:grid">
        <HeroHeading text={"Cockpit"} />
      </div>
      <div className="row grid grid-cols-1 lg:grid-cols-[60%_40%] xl:grid-cols-[30%_40%_30%] justify-between md:pt-16 pt-0">
        <div className="bg-contain bg-center bg-no-repeat relative hidden xl:grid h-fit pt-12">
          <div className="xl:pl-28">
            <HeroHeadingTwo text="Total Earning" />
            {userData && (
              <div className="grid grid-cols-2 gap-x-0 gap-y-6 mt-5 justify-start">
                <Earn
                  title="Today"
                  amount={userData?.income_per_day ?? 0}
                  currency="CDN"
                  key={0}
                />
                <Earn
                  title="This Week"
                  amount={userData?.income_per_week ?? 0}
                  currency="CDN"
                  key={1}
                />
                <Earn
                  title="This Month"
                  amount={userData?.income_per_month ?? 0}
                  currency="CDN"
                  key={2}
                />
                <Earn
                  title="Total Balance"
                  amount={userData?.balance ?? 0}
                  currency="CDN"
                  key={2}
                />
              </div>
            )}
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
        <div className="bg-contain bg-center bg-no-repeat relative grid xl:hidden mt-16 justify-around">
          <HeroHeadingTwo text="Total Earning" isCenter={true} />
          <div className="grid grid-cols-2 gap-x-0 gap-y-6 mt-5 px-6">
            <Earn title="Today" amount={12} />
            <Earn title="This Week" amount={142} isEnd={true} />
            <Earn title="This Month" amount={1242} />
            <Earn title="Total Balance" amount={1242} />
          </div>
          {/* <div className="w-full justify-center flex">
            <div className="bg-dark-main rounded-md py-2 px-7 flex justify-center transition-all duration-300 ease-linear mt-3 items-center w-fit text-primary-main cursor-pointer  hover:bg-primary-main hover:text-white">
              <p className="font-bold font-GBold text-[0.93rem]  hover:text-white">
                Go to Wallet
              </p>
            </div>
          </div> */}
        </div>
        <div className="mt-6 md:mt-0">
          <div className="grid justify-center mt-[-1rem]">
            <HeroHeadingTwo text="Validator Pools" />
          </div>
          <div className="flex flex-wrap justify-center">
            {userData &&
              userData?.staking_pools?.map((item: any, index: number) => (
                <div
                  className="w-[9.5rem] h-[9.5rem] grid relative"
                  key={index}
                >
                  <PieChartComponent
                    color={item.amount_locked != 0 ? "#00B649" : "#949596"}
                  />
                  <PieChartContent amount={item.amount_locked} />
                </div>
              ))}
          </div>
          <div className="flex flex-wrap xl:gap-12 gap-x-20 justify-center  my-7 items-center">
            {!isLoading && (
              <>
                <Earned
                  title="Total Earned"
                  amount={parseFloat(userData?.staking_rewards).toFixed(2)}
                  percentage={"13.6%"}
                  key={0}
                  currency="CDN"
                  showPrecentage={false}
                />
                <Earned
                  title="Network Share"
                  amount={parseFloat(
                    userData?.total_network_share_percentage
                  ).toFixed(2)}
                  percentage={"13.6%"}
                  key={1}
                  tagText="%"
                  showPrecentage={false}
                />
              </>
            )}
            <div className="bg-dark-main w-[10.43rem] mt-5 md:mt-0 py-3 h-fit transition-all duration-300 ease-linear justify-center rounded-lg cursor-pointer text-primary-main hover:bg-primary-main hover hover:text-white">
              <p className="font-bold font-GBold text-[0.93rem] text-center">
                Claim Reward
              </p>
            </div>
          </div>
          <div className="flex gap-7 mt-16 flex-wrap justify-center xl:gap-7 xl:justify-center px-8">
            <div className="xl:w-[17rem] w-[23rem] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Network Contribution" style={"!pb-3"} />
              <StokedPayoutBorChartComponent
                validatorPayoutdata={validatorPayoutdata}
              />
            </div>
            <div className="xl:w-[17rem] w-[23rem] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Payout History" style={"!pb-3"} />
              <LinePayoutChartComponent
                validatorPayoutdata={validatorPayoutdata}
              />
            </div>
          </div>
        </div>
        <div className="pt-12 flex justify-center px-2">
          <div className="w-full">
            {!isLoading && !selectedBoxData ? (
              <>
                <div className="grid justify-center w-full mt-10 lg:mt-0">
                  <HeroHeadingTwo text="3dge Box " />
                </div>
                <div className="relative w-full h-70 flex justify-center">
                  <div className="relative w-fit">
                    <video
                      src="/src/assets/boxVideo.mp4"
                      className={`w-80 h-auto object-cover rounded-lg shadow-lg transition-opacity duration-500 ease-in-out ${
                        isFading ? "opacity-0" : "opacity-100"
                      }`}
                      style={{ width: "30rem" }}
                      autoPlay
                      loop
                      muted
                    />
                  </div>
                </div>
                <div className="w-full justify-center flex">
                  <div
                    className={`py-3 w-max rounded-md bg-primary-main -ml-2 cursor-pointer transition-all duration-300 ease-linear px-4`}
                  >
                    <p className="text-center font-bold font-GBold text-white text-[em] w-max">
                      Get W3DGE Box
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="">
                <div className="grid justify-center xl:justify-start w-full mt-10 mb-5 lg:mt-0 ">
                  <HeroHeadingTwo text="3dge Box " />
                </div>
                <div className="flex row gap-5 xl:gap-10 w-full justify-start px-6">
                  <div className="h-[11.5rem] w-[11.5rem] relative ">
                    <PureComponent />
                    {!isFading && selectedBoxData && (
                      <div className="grid absolute top-[22%] left-[22%] justify-center w-[4.25rem]">
                        <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mb-3">
                          {" "}
                          Payout
                        </p>
                        <CounterAnimation
                          style="font-GBold font-bold text-[2.5rem] text-white text-center"
                          step={parseInt(selectedBoxData?.average_daily_income)}
                          countSteps={1}
                          duration={1000}
                        />
                        <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mt-3">
                          {"CDN"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="relative xl:pt-0 pt-[2.25rem]">
                    {!isLoading && (
                      <EarnedWithString
                        title="Box Identification"
                        amount={selectedBoxData?.box_id}
                        showPrecentage={false}
                        dgeBox
                        tagText="AXD"
                      />
                    )}
                    <div
                      onClick={handleNext}
                      className="absolute xl:top-[15%] top-[32%]  -right-[3.12rem] xl:-right-[3.12rem] h-fit w-fit rounded-full bg-primary-main cursor-pointer"
                    >
                      <ArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 xl:gap-10  px-8">
              {networkStats?.average_daily_revenue &&
                networkStats?.total_bandwidth &&
                networkStats?.total_bandwidth_daily && (
                  <>
                    {!isLoading && (
                      <EarnedWithString
                        title="Uptime in ViewBox"
                        amount={
                          isNaN(
                            Math.floor(networkStats?.unique_validator_count)
                          )
                            ? 0
                            : Math.floor(networkStats?.unique_validator_count)
                        }
                        showPrecentage={false}
                        dgeBox
                        tagText="AXD"
                      />
                    )}
                    {!isLoading && (
                      <EarnedWithString
                        title="Total Bandwidth"
                        amount={
                          isNaN(Math.floor(networkStats?.total_bandwidth))
                            ? 0
                            : Math.floor(networkStats?.total_bandwidth)
                        }
                        showPrecentage={false}
                        dgeBox
                        tagText="AXD"
                      />
                    )}
                    {!isLoading && (
                      <EarnedWithString
                        title="Network Contribution"
                        amount={
                          isNaN(Math.floor(networkStats?.total_bandwidth_daily))
                            ? 0
                            : Math.floor(networkStats?.total_bandwidth_daily)
                        }
                        showPrecentage={true}
                        dgeBox
                        tagText="AXD"
                        percentage="CDN"
                      />
                    )}
                    {!isLoading && (
                      <EarnedWithString
                        title="Total Earning"
                        amount={
                          isNaN(Math.floor(networkStats?.total_earnings))
                            ? 0
                            : Math.floor(networkStats?.total_earnings)
                        }
                        showPrecentage={true}
                        dgeBox
                        tagText="AXD"
                        percentage="CDN"
                      />
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-contain bg-center bg-no-repeat relative xl:hidden mt-16">
        <div className="mt-16 flex justify-center">
          <WontToLearn />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
