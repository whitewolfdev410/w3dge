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
import CounterAnimation from "../../components/animation/counterAnimation";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoxViewData,
  setIsLoading,
  setIsLoadingNet,
  setNetworkStats,
} from "../../context/boxDataSlice";

function W3Node() {
  const { address, isConnected } = useAccount();
  const [boxViewPayoutData, setBoxViewPayoutData] = useState<any>(null);
  const {
    boxViewData,
    networkStats,
    isLoading,
    isLoadingNet,
    locationCountData,
    boxPayoutList,
  } = useSelector((state: any) => state.boxData);
  const dispatch = useDispatch();
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

  const handleInitialLoad = async (boxId: string) => {
    const res = await fetchDataFromAWS("BoxPayout", {
      box_id: boxId,
    });
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const updatedData = res.map((item: any) => ({
      ...item,
      daily_payouts: item.daily_payouts.filter((payout: any) => {
        const payoutDate = new Date(payout.date);
        return payoutDate >= sevenDaysAgo && payoutDate <= today;
      }),
    }));
    setBoxViewPayoutData(updatedData[0]);
  };
  const handleBoxSelect = async (boxId: string) => {
    const res = await fetchDataFromAWS("BoxPayout", {
      box_id: boxId,
    });
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const updatedData = res.map((item: any) => ({
      ...item,
      daily_payouts: item.daily_payouts.filter((payout: any) => {
        const payoutDate = new Date(payout.date);
        return payoutDate >= sevenDaysAgo && payoutDate <= today;
      }),
    }));
    setBoxViewPayoutData(updatedData[0]);
    dispatch(setIsLoadingNet(true));
    const boxViewRes = await fetchDataFromAWS("BoxView", {
      box_id: boxId,
      wallet_address: address,
    });
    dispatch(
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
      })
    );
    dispatch(setIsLoadingNet(false));
  };
  useEffect(() => {
    if (boxViewData) handleInitialLoad(boxViewData[0]?.box_id);
  }, [boxViewData]);
  return (
    <div className="section-node p-10 xl:p-5">
      <div className="row  hidden xl:grid">
        <HeroHeading text={"Node View"} />
      </div>
      <div
        className={`row grid lg:grid-cols-[${"30%_70%"}]  xl:grid-cols-[${"20%_60%_20%"}] pt-16`}
      >
        <div className="flex flex-wrap mt-10 xl:mt-0 justify-center xl:justify-start gap-8 hidden xl:flex">
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Payout History" style={"!pb-3"} />
            <LineChartComponent boxViewPayoutData={boxViewPayoutData} />
          </div>
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Network Contribution" style={"!pb-3"} />
            <StokedBorChartComponent boxViewPayoutData={boxViewPayoutData} />
          </div>
        </div>

        <div
          className="flex-1  items-center   gl:pt-0  bg-center bg-no-repeat mt-10 xl:mt-0"
          style={
            {
              // backgroundImage: `url(${NodeBackground})`,
              // backgroundSize: "130% 130%",
            }
          }
        >
          {!isLoading && (
            <>
              <ImageSwap
                boxViewData={boxViewData}
                onBoxSelect={handleBoxSelect}
                networkStats={networkStats}
                isLoadingNet={isLoadingNet}
              />
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-5 flex-1 justify-between pt-8 xl:hidden">
          {!isLoadingNet && (
            <>
              <div>
                <p className="font-GBold font-normal text-sm text-white">
                  Uptime in ViewBox
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.unique_validator_count ?? 0}
                    countSteps={50}
                  />
                </div>
              </div>
              <div>
                <p className="font-GBold font-normal text-sm text-white">
                  Total Bandwidth
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.total_bandwidth ?? 0}
                    countSteps={50}
                  />
                </div>
              </div>
              <div>
                <p className="font-GBold font-normal text-sm text-white">
                  Network Contribution
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.total_bandwidth_daily ?? 0}
                    countSteps={50}
                  />
                </div>
              </div>
              <div>
                <p className="font-GBold font-normal text-sm text-white">
                  Total Earning
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.total_earnings ?? 0}
                    countSteps={50}
                  />
                  <p className="font-GRegular font-normal text-sm text-primary-main">
                    CDN
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className=" mt-10 xl:mt-0 flex justify-center xl:justify-start items-center">
          <div className="max-w-90 w-fit">
            <BoostPayout
              title="Boost your payout"
              percentage={BoostData.percentage}
              amount={BoostData.amount}
              stockNow
              validators={false}
            />
          </div>
        </div>
      </div>
      <div className="pt-16 grid  xl:pr-28">
        {/* { !isLoadingNet && ( */}
        <W3NodeFooter networkStats={networkStats} isLoadingNet={isLoadingNet} />
        {/* )} */}
      </div>
    </div>
  );
}

export default W3Node;
