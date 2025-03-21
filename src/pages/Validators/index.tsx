import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import WontToLearn from "../../components/footer/WontToLearn";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import TabMain from "../../components/tabs";
import { useState } from "react";
import LinePayoutChartComponent from "../../components/charts/linePayoutChart";
import StokedPayoutBorChartComponent from "../../components/charts/stackedPayoutBarChart";
import { useSelector } from "react-redux";

function Validators() {
  const [isStaked, setIsStaked] = useState<boolean>(false);
  const { pendingUnstake, userData, validatorPayoutdata } = useSelector(
    (state: any) => state.boxData
  );
  return (
    <div className="section-validators p-5 ">
      <div className="hidden pt-4 md:pt-0  md:flex">
        <HeroHeading text={"Validator Pools"} />
      </div>
      <div className="block pt-16">
        <div className="grid grid-cols-1 xl:grid-cols-[20%_70%_10%] ">
          <div className="h-full w-full relative"></div>
          <div className="flex gap-4 flex-wrap justify-center xl:justify-between">
            {userData &&
              userData?.staking_pools?.map((item: any, index: any) => {
                const matchingUnstake = pendingUnstake
                  ? pendingUnstake.find(
                      (data: any) => data.pool_id == item.pool_type
                    )
                  : null;
                const lastUpdateDate = matchingUnstake
                  ? new Date(matchingUnstake.unstake_date)
                  : null;
                const today = new Date();
                let isPieChart, timeDifference, daysDifference;
                if (!lastUpdateDate) {
                  if (item.amount_locked > 0) {
                    isPieChart = true;
                  } else {
                    isPieChart = false;
                  }
                } else {
                  timeDifference = Math.abs(
                    today.getTime() - lastUpdateDate.getTime()
                  );
                  daysDifference = Math.ceil(
                    timeDifference / (1000 * 3600 * 24)
                  );
                  isPieChart =
                    item.amount_locked > 0 ||
                    (item.amount_locked === 0 && daysDifference < 7);
                }

                return (
                  <BoostPayout
                    title={
                      item.amount_locked > 0 ? "Your share" : "Network share"
                    }
                    percentage={item.pool_type}
                    amount={item.amount_locked}
                    earned={item.reward_earned}
                    stockNow={false}
                    subtitle={
                      item.amount_locked > 0
                        ? "of Network<br/><br/>"
                        : "for Validator reward"
                    }
                    validators
                    level={index + 1}
                    is_piechart={isPieChart}
                    key={index}
                    pendingUnstake={pendingUnstake}
                    setIsStaked={setIsStaked}
                  />
                );
              })}
          </div>

          <div className="h-full w-full relative "></div>
        </div>
      </div>
      <div className=" mt-10 md:mt-32 grid grid-cols-1 xl:grid-cols-[20%_70%_10%]">
        <div className="hidden  xl:grid items-center">
          <WontToLearn />
        </div>
        <div className="flex gap-5 flex-wrap justify-center xl:justify-between">
          <div className=" w-[24rem] lg:w-80 h-72 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Network Contribution" style={"!pb-3"} />
            {/* {boxViewPayoutData && (
              <StokedBorChartComponent boxViewPayoutData={boxViewPayoutData} />
            )} */}
            <StokedPayoutBorChartComponent
              validatorPayoutdata={validatorPayoutdata}
            />
          </div>
          <div className="xl:w-[29rem] w-[24rem] h-72 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Payout History" style={"!pb-3"} />
            <LinePayoutChartComponent
              validatorPayoutdata={validatorPayoutdata}
            />
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
