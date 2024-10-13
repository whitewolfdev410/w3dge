import CounterAnimation from "../animation/counterAnimation";

function Earned({
  title,
  amount,
  dgeBox,
  percentage,
  showPrecentage = true,
  tagText,
  className,
  currency,
}: {
  title: string;
  amount: any;
  percentage?: string;
  dgeBox?: boolean;
  showPrecentage?: boolean;
  tagText?: string;
  className?: any;
  currency?: any;
}) {
  // Ensure amount is a valid number, fallback to 0 if it's not
  const validAmount = Number(amount) || 0;

  return (
    <div className={`${className ? className : ""}`}>
      <p className="font-normal font-GRegular text-[0.87rem] text-[#949596]">
        {title}
      </p>
      <div className="flex items-end gap-0">
        <CounterAnimation
          style={`${
            dgeBox ? "font-normal font-GRegular" : "font-bold font-GBold"
          } text-[2rem] text-white`}
          step={Math.floor(validAmount)} // Use validAmount here
          countSteps={dgeBox || title === "Total Earned" ? 50 : 10}
          duration={dgeBox ? 5000 : 1000}
          tagText={tagText}
        />
        {showPrecentage && (
          <p className="font-bold font-GBold text-[16px] text-primary-main pb-1">
            {percentage}
          </p>
        )}
        <p className="font-bold font-GBold text-[16x] text-primary-main pb-1">
          {currency}
        </p>
      </div>
    </div>
  );
}

export default Earned;
