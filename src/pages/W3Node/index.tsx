import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import ImageSwap from "../../components/w3NodeComponents/ImageSwap";
import { BoostData } from "../../assets/boostdata";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import W3NodeFooter from "../../components/footer/W3NodeFooter";

function W3Node() {
  const { address, isConnected } = useAccount();
  const [ networkStats, setNetworkStats ] = useState<any>();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [isLoadingNet, setIsLoadingNet] = useState<boolean>(true);
  const [ error, setError ] = useState<any>(null)
  const [boxViewData, setBoxViewData] = useState<any>(null)
  const [boxViewPayoutData, setBoxViewPayoutData] = useState<any>(null)
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [averageDailyRevenue, setAverageDailyRevenue] = useState<any>(null)
  const [locationCountData, setLocationCountData] = useState<any>(null)

  const handleBoxSelect = (boxId: string) => {
    fetchData(
      import.meta.env.VITE_API_URL + '/boxPayout/' + boxId,
      (data:any) => setBoxViewPayoutData(data),
      setError,
      setIsLoading,
      false
    );
    console.log('here is error: ', error)
    console.log('here is isLoading: ', isLoading)
    console.log('here is selectedBoxId: ', selectedBoxId)
    console.log('here is averageDailyRevenue: ', averageDailyRevenue)
    console.log('here is locationCountData: ', locationCountData)
    setSelectedBoxId(boxId);
  };
  const fetchData = async (url:string, setData:any, setError:any, setChangeStatus:any, isdate: boolean) => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      let reqUrl = isdate ? `${url}/${todayDate}` : url;
      const response = await axios.get(reqUrl);
      setData(response.data);
    } catch (err:any) {
      setError(err.message);
    } finally {
      setChangeStatus(false);
    }
  };
  
  useEffect(() => {
    if (isConnected && address) {
      setIsLoading(true);
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
          setAverageDailyRevenue(data.average_daily_revenue);
          setLocationCountData(Object.entries(data.location_count).map(([name, amount]) => ({
            name,
            amount
          })));
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
    }
  }, [isConnected, address]);
  useEffect(()=>{
    if(boxViewData)
    handleBoxSelect(boxViewData[0]?.box_id)
  }, [boxViewData])
  return (
    <div className="section-node p-5">
      <div className="grid row">
        <HeroHeading text={"Node View"} />
      </div>
      <div className=" row grid lg:grid-cols-[30%_70%]  xl:grid-cols-[20%_60%_20%] pt-16">
        <div className="flex flex-wrap mt-10 xl:mt-0 justify-center xl:justify-start gap-8 ">
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance" style={"!pb-3"} />
            <LineChartComponent boxViewPayoutData={boxViewPayoutData}/>
          </div>
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance 2" style={"!pb-3"} />
            <StokedBorChartComponent boxViewPayoutData = {boxViewPayoutData}/>
          </div>
        </div>
        <div
          className="flex-1 grid items-center  gl:pt-0  bg-center bg-no-repeat mt-10 xl:mt-0"
          // style={{
          //   backgroundImage: `url(${NodeBackground})`,
          //   backgroundSize: "130% 130%",
          // }}
        >
          <ImageSwap boxViewData={boxViewData} onBoxSelect={handleBoxSelect}/>
        </div>
        <div className=" mt-10 xl:mt-0 flex justify-center xl:justify-start items-center">
          <div className="max-w-80 w-fit">
            <BoostPayout
              title="Boost your payout"
              precentage={BoostData.percentage}
              amount={BoostData.amount}
              stockNow
              validators={false}
            />
          </div>
        </div>
      </div>
      <div className="pt-16 grid  xl:pr-28">
        { !isLoadingNet && (
          <W3NodeFooter networkStats={networkStats}/>
        )}
      </div>
    </div>
  );
}

export default W3Node;
