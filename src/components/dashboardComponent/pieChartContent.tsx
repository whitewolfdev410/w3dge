import PrimaryLogo from "../../assets/images/logo-chart-primary.png";
import CounterAnimation from "../animation/counterAnimation";
function PieChartContent({ amount }: { amount?: number }) {
  return (
    <div className="absolute top-10 left-12 flex flex-col justify-center ">
      <img src={PrimaryLogo} style={{ width: "30px", margin: "auto" }} />
      {amount ? (
        <CounterAnimation
          style="font-bold font-GBold text-[15px] text-[#BABABA] text-center"
          step={amount}
          countSteps={1}
          duration={1000}
        />
      ) : (
        <p className="font-bold font-GBold text-[15px] text-[#BABABA] text-center">
          nothing
        </p>
      )}
      <p className="font-bold font-GBold text-[10px] text-[#767676] text-center">
        Earned
      </p>
    </div>
  );
}

export default PieChartContent;
