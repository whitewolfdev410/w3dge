import { Heading1, HeroHeading } from "../../components/FontComponent";
import BackgroundImage from "../../assets/images/home-icon.png";
import DailyPayouts from "../../components/homeComponents/DailyPayouts";
import Footer from "../../components/footer";
import AutoScrollContainer from "../../components/animation/AutoScrollContainer";
import { HomeData } from "../../assets/constant";
import { LocationCount } from "../../assets/location_count"
import Distribution from "../../components/homeComponents/Distribution";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";

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

  const { address, isConnected } = useAccount();
  const [ networkStats, setNetworkStats ] = useState<any>();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<any>(null)
  const [locationCountData, setLocationCountData] = useState<any>(null)
  const [boxPayoutList, setBoxPayoutList] = useState<any>(null)
  const [averageDailyRevenue, setAverageDailyRevenue] = useState<any>(null)

  const fetchData = async (url:string, setData:any, setError:any, setIsLoading:any) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const response = await axios.get(`${url}/${todayDate}`);
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
        import.meta.env.VITE_API_URL + '/networkStats',
        (data:any) => {
          setNetworkStats(data);
          setAverageDailyRevenue(data.average_daily_revenue);
          setLocationCountData(Object.entries(data.location_count).map(([name, amount]) => ({
            name,
            amount
          })));
        },
        setError,
        setIsLoading
      );
  
      fetchData(
        import.meta.env.VITE_API_URL + '/boxPayoutList',
        (data:any) => setBoxPayoutList(data.transactions),
        setError,
        setIsLoading
      );
    }
  }, [isConnected, address]);
  return (
    <div className="section-home p-5 ">
      <div className="grid ">
        <HeroHeading text={"Network"} />
      </div>
      <div className="block pt-16">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_60%_20%] ">
          <div className=" mt-20 mb-16 p-3">
            <Heading1 text="Distribution" />
            {!isLoading && locationCountData && (locationCountData.map((item:any, index:any) => (
              <Distribution width={`w-[${item.amount}]`} key={index} amount={item.amount} name={item.name} />
            )))}
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
                { !isLoading && boxPayoutList?.map((item:any, index:number) => (
                  <DailyPayouts key={index} item={item} />
                ))}
              </div>
            </AutoScrollContainer>

            <div className="opacity-55 absolute bottom-14 left-0 right-[0.62rem] h-14 z-10 bg-[#000]"></div>
          </div>
        </div>
      </div>
      <div className="grid pr-12">
        { !isLoading && (
          <Footer networkStats={networkStats}/>
        )}
      </div>
    </div>
  );
}

export default HomePage;
