import CounterAnimation from "../animation/counterAnimation";

function Earn({ title, amount }: { title: string; amount: number }) {
  return (
    <div className="w-fit">
      <p className="font-normal font-GRegular text-[24px] text-white">
        {title}
      </p>
      <div className="flex items-end -mt-3">
        <CounterAnimation
          style="font-bold font-GBold text-[48px] text-white"
          step={amount}
          countSteps={10}
          duration={1000}
        />
        <p className="font-bold font-GBold text-[16x] text-primary-main pb-3">
          CDN
        </p>
      </div>
    </div>
  );
}

export default Earn;
