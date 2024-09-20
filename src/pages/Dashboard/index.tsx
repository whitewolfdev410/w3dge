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
import { FooterData, PayoutData } from "../../assets/footerdata";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState<any>(); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [boxViewData, setBoxViewData] = useState<any>(null)
  const [boxViewPayoutData, setBoxViewPayoutData] = useState<any>(null)
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
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
      const response = await axios.get(reqUrl);
      setData(response.data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (isConnected && address) {
      setIsLoading(true);
      fetchData(
        import.meta.env.VITE_API_URL + '/boxView',
        (data:any) => setBoxViewData(data),
        setError,
        setIsLoading,
        false
      );
    }
  }, [isConnected, address]);
  useEffect(()=>{
    if(boxViewData)
    handleBoxSelect(boxViewData[0]?.box_id)
  }, [boxViewData])

  useEffect(() => {
    if (isConnected && address) {
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
  console.log('userData: ', userData)

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
                  <Earn title="Today" amount={userData?.income_per_day ?? 0} currency="CND"/>
                  <Earn title="This Week" amount={userData?.income_per_week ?? 0} currency="CND"/>
                  <Earn title="This Month" amount={userData?.income_per_month ?? 0} currency="CND"/>
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
                <Earned title="Total Earned" amount={userData?.staking_rewards} percentage={"13.6%"}/>
                <Earned title="Total Earned" amount={userData?.total_network_share_percentage} percentage={"13.6%"} tagText="%"/>
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
                  <p className="font-GRegular font-normal text-[0.75rem] text-white text-end -mb-3">
                    {" "}
                    Payout
                  </p>
                  <CounterAnimation
                    style="font-GBold font-bold text-[2.5rem] text-white"
                    step={PayoutData.amount}
                    countSteps={1}
                    duration={1000}
                  />
                  <p className="font-GRegular font-normal text-[0.75rem] text-white text-end -mt-3">
                    {PayoutData.token}
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
              {FooterData.map((item) => (
                <Earned title={item.title} amount={item.value} percentage={item.percentage} dgeBox />
              ))}
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
