import PrimaryLogo from "../../assets/images/logo-chart-primary.png";
import CounterAnimation from "../animation/counterAnimation";
function PieChartContent({ amount, title }: { amount?: any, title?: string }) {
  return (
    <div className="absolute top-[3.2rem] left-[3.3rem] flex flex-col justify-center " style={{minWidth: '45px'}}>
      <img src={PrimaryLogo} style={{ width: "1.87rem", margin: "auto" }} />
      {amount ? (
        <CounterAnimation
          style="font-bold font-GBold text-[0.93rem] text-[#BABABA] text-center"
          step={amount}
          countSteps={1}
          duration={1000}
        />
      ) : (
        <p className="font-bold font-GBold text-[0.93rem] text-[#BABABA] text-center">
          nothing
        </p>
      )}
      <p className="font-bold font-GBold text-[0.62rem] text-[#767676] text-center">
        {title ? title : 'Staked'}
      </p>
    </div>
  );
}

export default PieChartContent;
