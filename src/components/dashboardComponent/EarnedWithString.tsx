import CounterAnimation from "../animation/counterAnimation";

function EarnedWithString({
  title,
  amount,
  dgeBox,
  percentage,
  showPrecentage = true,
  tagText,
}: {
  title: string;
  amount: any;
  percentage?: string;
  dgeBox?: boolean;
  showPrecentage?: boolean;
  tagText?: string;
}) {
  return (
    <div>
      <p className="font-normal font-GRegular text-[0.87rem] text-[#949596]">
        {title}
      </p>
      <div className="flex items-end gap-2">
        {/* <CounterAnimation
          style={`${
            dgeBox ? "font-normal font-GRegular" : "font-bold font-GBold"
          } text-[2rem] text-white`}
          step={amount}
          countSteps={dgeBox || title === "Total Earned" ? 50 : 10}
          duration={dgeBox ? 5000 : 1000}
          tagText={tagText}
        /> */}
        <p
          className={`${
            dgeBox ? "font-normal font-GRegular" : "font-bold font-GBold"
          } text-[2rem] text-white`}
        >
          
          {amount}
        </p>
        {showPrecentage && (
          <p className="font-bold font-GBold text-[16x] text-primary-main pb-2">
            {percentage}
          </p>
        )}
      </div>
    </div>
  );
}

export default EarnedWithString;
