import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import WontToLearn from "../../components/footer/WontToLearn";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import TabMain from "../../components/tabs";
import { ValidatorsData } from "../../assets/validatordata";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";

function Validators() {
  const { address, isConnected } = useAccount();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<any>(null)
  const [boxViewData, setBoxViewData] = useState<any>(null)
  const [boxViewPayoutData, setBoxViewPayoutData] = useState<any>(null)
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
                is_piechart={item.is_piechart}
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
            <StokedBorChartComponent boxViewPayoutData = {boxViewPayoutData}/>
          </div>
          <div className="w-[29rem] h-72 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance" style={"!pb-3"} />
            <LineChartComponent boxViewPayoutData={boxViewPayoutData}/>
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
