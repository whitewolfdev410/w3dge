import CounterAnimation from "../animation/counterAnimation";

function Earn({
  title,
  amount,
  currency,
  isEnd,
}: {
  title: string;
  amount: number;
  currency?: string;
  isEnd?: boolean;
}) {
  return (
    <div className={`w-fit ${isEnd ? "justify-self-end" : ""}`}>
      <p className="font-normal font-GRegular text-[1.5rem] text-white">
        {title}
      </p>
      <div className="flex items-end -mt-3">
        <CounterAnimation
          style="font-bold font-GBold text-[3rem] text-white"
          step={Math.floor(amount)}
          countSteps={10}
          duration={1000}
        />
        <p className="font-bold font-GBold text-[16x] text-primary-main pb-3">
          {currency}
        </p>
      </div>
    </div>
  );
}

export default Earn;
