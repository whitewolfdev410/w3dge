import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import WontToLearn from "../../components/footer/WontToLearn";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import TabMain from "../../components/tabs";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import LinePayoutChartComponent from "../../components/charts/linePayoutChart";

function Validators() {
  const { address, isConnected } = useAccount();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<any>(null)
  const [boxViewData, setBoxViewData] = useState<any>(null)
  const [boxViewPayoutData, setBoxViewPayoutData] = useState<any>(null)
  const [validatorPayoutdata, setValidatorPayoutdata] = useState<any>(null)
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const handleBoxSelect = (boxId: string) => {
    fetchData(
      import.meta.env.VITE_API_URL + '/boxPayout/' + boxId,
      (data:any) => setBoxViewPayoutData(data),
      setError,
      setIsLoading,
      false
    );
    fetchData(
      import.meta.env.VITE_API_URL + '/validator_payouts',
      (data:any) => setValidatorPayoutdata(data),
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
      fetchData(
        import.meta.env.VITE_API_URL + '/users/' + address,
        (data:any) => setUserData(data),
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
  console.log('here is validatorPayoutdata: ', validatorPayoutdata)
  return (
    <div className="section-validators p-5 ">
      <div className="grid pt-4 md:pt-0 ">
        <HeroHeading text={"Validator Pools"} />
      </div>
      <div className="block pt-16">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_70%_10%] ">
          <div className="h-full w-full relative"></div>
          <div className="flex gap-5 flex-wrap justify-center xl:justify-between">
            {userData && userData.staking_pools.map((item: any, index: any) => (
              <BoostPayout
                title={item.amount_locked > 0 ? 'Your share' : 'Network share'}
                precentage={item.pool_type}
                amount={item.amount_locked}
                earned={item.reward_earned}
                stockNow={false}
                subtitle={item.amount_locked > 0 ? "of Network" : "for Validator reward"}
                validators
                level={index + 1}
                is_piechart={item.amount_locked > 0 ? true : false}
                key={index}
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
            <Bodoy1 text="Network Contribution" style={"!pb-3"} />
            <StokedBorChartComponent boxViewPayoutData = {boxViewPayoutData}/>
          </div>
          <div className="w-[29rem] h-72 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Payout History" style={"!pb-3"} />
            <LinePayoutChartComponent validatorPayoutdata={validatorPayoutdata}/>
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
