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
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight } from "../../icons";
import EarnedWithString from "../../components/dashboardComponent/EarnedWithString";

function Dashboard() {
  
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState<any>(); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [boxViewData, setBoxViewData] = useState<any>(null)
  const [boxViewPayoutData, setBoxViewPayoutData] = useState<any>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [selectedBoxData, setSelectedBoxData] = useState<any>();
  const [isLoadingNet, setIsLoadingNet] = useState<boolean>(true);
  const [ networkStats, setNetworkStats ] = useState<any>();
  const handleBoxSelect = (boxId: string) => {
    fetchData(
      import.meta.env.VITE_API_URL + '/boxPayout/' + boxId,
      (data:any) => setBoxViewPayoutData(data),
      setError,
      setIsLoading,
      false
    );
    console.log('here is error: ', error)
    console.log('here is selectedBoxId: ', selectedBoxId)
    console.log('here is isLoading: ', isLoading)
    setSelectedBoxId(boxId);
  };
  const fetchData = async (url:string, setData:any, setError:any, setIsLoading:any, isdate: boolean) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      let reqUrl = isdate ? `${url}/${todayDate}` : url;
      console.log('here: ', reqUrl)
      const response = await axios.get(reqUrl);
      setData(response.data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    if(boxViewData){
      handleBoxSelect(boxViewData[0]?.box_id)
      setSelectedBoxData(boxViewData[0]);
    }
  }, [boxViewData])

  useEffect(() => {
    if (isConnected && address) {
      setIsLoadingNet(true);
      fetchData(
        import.meta.env.VITE_API_URL + '/boxView/address/' + address,
        (data:any) => {
          setNetworkStats({
            average_daily_revenue: data?.average_daily_income,
            total_bandwidth: data?.total_bandwidth,
            total_bandwidth_daily: data?.total_bandwidth * 0.1,
            unique_validator_count: data?.uptime_in_days * 24,
            total_earnings: data?.total_income_per_box
          });
        },
        setError,
        setIsLoadingNet,
        false
      );
      fetchData(
        import.meta.env.VITE_API_URL + '/boxView/wallet/' + address,
        (data:any) => setBoxViewData(data),
        setError,
        setIsLoading,
        false
      );
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${address}`);
          setUserData(response.data);
          setLoading(false);
        } catch (err:any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isConnected, address]);
  const handleNext = (): void => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      const newIndex = currentIndex === boxViewData.length - 1 ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedBoxData(boxViewData[newIndex]); // Send box_id to parent component
      setIsFading(false);
    }, 500); // 500ms fade duration
  };
  console.log('boxViewPayoutData: ', boxViewPayoutData?.total_payouts)

  return (
    <div className="section-dashboard p-5 ">
      <div className="grid pt-4 md:pt-0">
        <HeroHeading text={"Cockpit"} />
      </div>
      <div className="row grid grid-cols-1 lg:grid-cols-[60%_40%] xl:grid-cols-[30%_40%_30%] justify-between pt-16">
        <div className="bg-contain bg-center bg-no-repeat relative hidden xl:grid h-fit pt-12">
          <div className="xl:pl-28">
            <HeroHeadingTwo text="Total Earning" />
            {!loading && (
              <div className="grid grid-cols-2 gap-x-0 gap-y-6 mt-5 justify-start">
                  <Earn title="Today" amount={userData?.income_per_day ?? 0} currency="CND" key={0}/>
                  <Earn title="This Week" amount={userData?.income_per_week ?? 0} currency="CND" key={1}/>
                  <Earn title="This Month" amount={userData?.income_per_month ?? 0} currency="CND" key={2}/>
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
        <div className="">
          <div className="grid justify-center">
            <HeroHeadingTwo text="Validator Pools" />
          </div>
          <div className="flex flex-wrap justify-center">
            {userData?.staking_pools.map((item: any) => (
              <div className="w-[9.5rem] h-[9.5rem] grid relative">
                <PieChartComponent color={item.amount_locked != 0 ? "#00B649" : "#949596"} />
                <PieChartContent amount={item.amount_locked} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-12 justify-center  my-7 items-center">
            {!loading && (
              <>
                <Earned title="Total Earned" amount={Math.floor(userData?.staking_rewards)} percentage={"13.6%"} key={0}/>
                <Earned title="Total Earned" amount={Math.floor(userData?.total_network_share_percentage)} percentage={"13.6%"} key={1} tagText="%"/>
              </>
            )}
            <div className="bg-dark-main w-[10.43rem] py-3 h-fit transition-all duration-300 ease-linear justify-center rounded-lg cursor-pointer text-primary-main hover:bg-primary-main hover hover:text-white">
              <p className="font-bold font-GBold text-[0.93rem] text-center">
                Claim Reward
              </p>
            </div>
          </div>
          <div className="flex gap-7 mt-16 flex-wrap justify-center xl:gap-7 xl:justify-center">
            <div className="w-[17rem] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Preformance 2" style={"!pb-3"} />
              <StokedBorChartComponent boxViewPayoutData = {boxViewPayoutData}/>
            </div>
            <div className="w-[17rem] h-72 grid bg-dark-main p-4 rounded-xl">
              <Bodoy1 text="Preformance" style={"!pb-3"} />
              <LineChartComponent boxViewPayoutData={boxViewPayoutData}/>
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
                  <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mb-3">
                    {" "}
                    Payout
                  </p>
                  {boxViewPayoutData?.total_payouts && (
                    <CounterAnimation
                      style="font-GBold font-bold text-[2.5rem] text-white"
                      step={parseInt(boxViewPayoutData?.total_payouts)}
                      countSteps={1}
                      duration={1000}
                    />
                  )}
                  <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mt-3">
                    {'CDN'}
                  </p>
                </div>
              </div>
              <div className="relative">
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
                  className="absolute top-[15%]  -right-[3.12rem] xl:-right-[3.12rem] h-fit w-fit rounded-full bg-primary-main cursor-pointer"
                >
                  <ArrowRight />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 xl:gap-10">
              { !isLoadingNet && (
                <>
                  <Earned title={'Uptime in ViewBox'} amount={networkStats?.unique_validator_count ?? 0} percentage={'+13.6%'} dgeBox />
                  <Earned title={'Total Bandwidth'} amount={networkStats?.total_bandwidth ?? 0} percentage={'+13.6%'} dgeBox />
                  <Earned title={'Network Contribution'} amount={networkStats?.total_bandwidth_daily ?? 0} percentage={'+13.6%'} dgeBox />
                  <Earned title={'Total Earning'} amount={networkStats?.total_earnings ?? 0} percentage={'+13.6%'} dgeBox />
                </>
              )}
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
