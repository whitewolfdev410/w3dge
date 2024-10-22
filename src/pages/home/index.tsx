import { Heading1, HeroHeading } from "../../components/FontComponent";
import BackgroundImage from "../../assets/images/home-icon.png";
import DailyPayouts from "../../components/homeComponents/DailyPayouts";
import Footer from "../../components/footer";
import AutoScrollContainer from "../../components/animation/AutoScrollContainer";
import Distribution from "../../components/homeComponents/Distribution";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import CounterAnimation from "../../components/animation/counterAnimation";
import PureComponent from "../../components/charts/SimpleRadialBarChart";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoxPayoutList,
  setBoxViewData,
  setIsLoading,
  setIsLoadingNet,
  setLocationCountData,
  setNetworkStats,
  setPendingUnstake,
  setUserData,
  setValidatorPayoutdata,
} from "../../context/boxDataSlice";

const blinkingPoints = [
  // {
  //   x: "right-[298px]",
  //   y: "top-[180px]",
  // },
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
  // {
  //   x: "right-[256px]",
  //   y: "top-[172px]",
  // },
  {
    x: "right-[256px]",
    y: "top-[188px]",
  },
  // {
  //   x: "right-[280px]",
  //   y: "top-[172px]",
  // },
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
const blinkingPointsMobile = [
  // {
  //   x: "right-[298px]",
  //   y: "top-[180px]",
  // },
  {
    x: "right-[20%]",
    y: "top-[76%]",
  },
  {
    x: "right-[15%]",
    y: "top-[74%]",
  },
  {
    x: "right-[15%]",
    y: "top-[70%]",
  },
  {
    x: "right-[25%]",
    y: "top-[40%]",
  },
  // {
  //   x: "right-[256px]",
  //   y: "top-[172px]",
  // },
  {
    x: "right-[35%]",
    y: "top-[40%]",
  },
  // {
  //   x: "right-[280px]",
  //   y: "top-[172px]",
  // },
  {
    x: "right-[25%]",
    y: "top-[30%]",
  },
  {
    x: "right-[30%]",
    y: "top-[25%]",
  },
  {
    x: "right-[20%]",
    y: "top-[57%]",
  },
];

function HomePage() {
  const { address, isConnected } = useAccount();
  const [error, setError] = useState<any>(null);
  const dispatch = useDispatch();
  const {
    networkStats,
    isLoading,
    isLoadingNet,
    locationCountData,
    boxPayoutList,
  } = useSelector((state: any) => state.boxData);

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

  useEffect(() => {
    if (isConnected && address) {
      dispatch(setIsLoading(true));
      dispatch(setIsLoadingNet(true));
      const fetchNetworkData = async () => {
        dispatch(setIsLoading(true));
        try {
          const networkStatsDataRes = await fetchDataFromAWS("NetworkStats");
          const latestNetworkStats = networkStatsDataRes.sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )[0];
          const cumulativeTotalsData = await fetchDataFromAWS("NetworkStats", {
            type: "cumulative_totals",
          });

          if (latestNetworkStats && cumulativeTotalsData) {
            const data = {
              ...latestNetworkStats,
              total_earnings: cumulativeTotalsData?.[0].total_earnings,
              total_bandwidth: cumulativeTotalsData?.[0].total_bandwidth,
            };
            dispatch(setNetworkStats(data));
            dispatch(
              setLocationCountData(
                Object.entries(data.location_count).map(([name, amount]) => ({
                  name,
                  amount,
                }))
              )
            );
          } else {
            setError("No data found");
          }
          const res = await fetchDataFromAWS("UserData", {
            wallet_address: address,
          });
          const boxData = await fetchDataFromAWS("BoxView", {
            box_id: { $in: res?.[0]?.boxes },
          });
          dispatch(setBoxViewData(boxData));
          const pendingUnstakeData = await fetchDataFromAWS("PendingUnstake", {
            wallet_address: address,
          });
          dispatch(setPendingUnstake(pendingUnstakeData));
          const userData = await fetchDataFromAWS("UserData", {
            wallet_address: address,
          });
          dispatch(
            setUserData(
              userData?.[0] || {
                staking_pools: [
                  {
                    pool_type: "2%",
                    amount_locked: 0,
                    reward_earned: 0,
                  },
                  {
                    pool_type: "3%",
                    amount_locked: 0,
                    reward_earned: 0,
                  },
                  {
                    pool_type: "5%",
                    amount_locked: 0,
                    reward_earned: 0,
                  },
                  {
                    pool_type: "10%",
                    amount_locked: 0,
                    reward_earned: 0,
                  },
                ],
              }
            )
          );
          const validatorData = await fetchDataFromAWS("ValidatorPayouts", {
            date: {
              $gte: new Date(new Date().setDate(new Date().getDate() - 7))
                .toISOString()
                .split("T")[0],
            },
          });
          dispatch(setValidatorPayoutdata(validatorData || []));
        } catch (err) {
          setError("Error fetching data");
          console.error(err);
        } finally {
          dispatch(setIsLoading(false));
        }
        dispatch(setIsLoadingNet(false));
      };
      const fetchBoxPayoutListData = async () => {
        const res = await fetchDataFromAWS("BoxPayoutList");
        const latestBoxPayoutList = res.sort(
          (a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0];
        dispatch(setBoxPayoutList(latestBoxPayoutList.transactions));
      };
      fetchNetworkData();
      fetchBoxPayoutListData();
    }
  }, [isConnected, address]);
  return (
    <div className="section-home md:p-7 p-2">
      <div className=" hidden xl:grid">
        <HeroHeading text={"Network"} />
      </div>
      <div className="block pt-16">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_60%_20%] ">
          <div className="mt-0 xl:mt-20 xl:mb-16 mb-0  flex md:grid">
            <Heading1 text="Distribution" isHidden={true} />
            <div className="grid justify-center md:flex md:justify-between mt-6 md:mt-0">
              {!isLoadingNet && (
                <div className="  relative mt-0 h-[9.5rem] w-[9.5rem] xl:hidden flex justify-start">
                  <PureComponent />
                  <div className="grid absolute top-[22%] left-[25%] justify-center w-[4.25rem]">
                    <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mb-3">
                      {" "}
                      Payout
                    </p>
                    <CounterAnimation
                      style="font-GBold font-bold text-[2.5rem] text-white text-center"
                      step={
                        Math.floor(networkStats?.average_daily_revenue) ?? 0
                      }
                      countSteps={1}
                      duration={1000}
                    />
                    <p className="font-GRegular font-normal text-[0.75rem] text-white text-center -mt-3">
                      CDN
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full">
              {!isLoading &&
                locationCountData &&
                (() => {
                  const totalAmount = locationCountData.reduce(
                    (sum: number, item: any) => sum + item.amount,
                    0
                  );
                  return [...locationCountData]
                    .sort((a: any, b: any) => b.amount - a.amount) // Reorder the data by 'amount' in descending order
                    .map((item: any, index: any) => {
                      const percentage =
                        Math.floor((100 / totalAmount) * item.amount * 10) / 10; // Calculate and round down to one decimal place
                      return (
                        <Distribution
                          width={`w-[${percentage}%]`}
                          key={index}
                          amount={percentage}
                          name={item.name}
                        />
                      );
                    });
                })()}
            </div>
          </div>
          <div className="flex justify-center items-center xl:hidden">
            <div className="w-fit h-fit  bg-contain bg-center bg-no-repeat relative ">
              <img
                src={BackgroundImage}
                className="xl:h-[31.25rem] h-[13.25rem]"
              />
              {blinkingPointsMobile?.map((item) => (
                <div
                  key={item?.x + item?.y}
                  className={`blinking-point absolute ${item?.y} ${item?.x} z-10`}
                ></div>
              ))}
            </div>
          </div>
          <div
            className="w-full xl:h-[31.25rem] h-[20.25rem] bg-contain bg-center bg-no-repeat relative hidden xl:flex "
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

          {!isLoadingNet && (
            <div className=" gap-7 grid grid-cols-2 justify-around pt-0 xl:hidden flex xl:pr-10 pl-6">
              <div>
                <p className="font-GBold font-normal text-sm text-white">
                  Active Validators
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.unique_validator_count ?? 0}
                    countSteps={50}
                  />
                  {/* <p className="font-GRegular font-normal text-sm text-primary-main">
              +13.6%
            </p> */}
                </div>
              </div>
              <div className="pl-8">
                <p className="font-GBold font-normal text-sm text-white">
                  Total Bandwidth
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.total_bandwidth ?? 0}
                    countSteps={50}
                  />
                  {/* <p className="font-GRegular font-normal text-sm text-primary-main">
              +13.6%
            </p> */}
                </div>
              </div>
              <div>
                <p className="font-GBold font-normal text-sm text-white">
                  Bandwidth Today
                </p>
                <div className="flex items-end gap-2 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.total_bandwidth_daily ?? 0}
                    countSteps={50}
                  />
                  {/* <p className="font-GRegular font-normal text-sm text-primary-main">
              +13.6%
            </p> */}
                </div>
              </div>
              <div className="pl-8">
                <p className="font-GBold font-normal text-sm text-white">
                  Total Earning
                </p>
                <div className="flex items-end gap-1 mt-1">
                  <CounterAnimation
                    style="font-GRegular font-normal text-3xl text-white"
                    step={networkStats?.total_earnings ?? 0}
                    countSteps={50}
                  />
                  <p className="font-GRegular font-normal text-sm text-primary-main pb-1">
                    CDN
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="relative h-fit mt-20">
            <Heading1 text="Daily Payouts" />
            <AutoScrollContainer>
              <div className="scroll-container p-3 relative">
                {!isLoading &&
                  boxPayoutList?.map((item: any, index: number) => (
                    <DailyPayouts key={index} item={item} />
                  ))}
              </div>
            </AutoScrollContainer>

            <div className="opacity-55 absolute bottom-14 left-0 right-[0.62rem] h-14 z-10 bg-[#000]"></div>
          </div>
        </div>
      </div>
      <div className="grid xl:pr-12 pr-0">
        {!isLoadingNet && <Footer networkStats={networkStats} />}
      </div>
    </div>
  );
}

export default HomePage;
