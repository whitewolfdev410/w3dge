import CounterAnimation from "../animation/counterAnimation";

function Earned({
  title,
  amount,
  dgeBox,
  showPrecentage = true,
  tagText,
}: {
  title: string;
  amount: number;
  dgeBox?: boolean;
  showPrecentage?: boolean;
  tagText?: string;
}) {
  return (
    <div>
      <p className="font-normal font-GRegular text-[14px] text-[#949596]">
        {title}
      </p>
      <div className="flex items-end gap-2">
        <CounterAnimation
          style={`${
            dgeBox ? "font-normal font-GRegular" : "font-bold font-GBold"
          } text-[32px] text-white`}
          step={amount}
          countSteps={dgeBox || title === "Total Earned" ? 50 : 10}
          duration={dgeBox ? 5000 : 1000}
          tagText={tagText}
        />
        {/* <p
          className={`${
            dgeBox ? "font-normal font-GRegular" : "font-bold font-GBold"
          } text-[32px] text-white`}
        >
          
          {amount}
        </p> */}
        {showPrecentage && (
          <p className="font-bold font-GBold text-[16x] text-primary-main pb-2">
            +13,6%
          </p>
        )}
      </div>
    </div>
  );
}

export default Earned;
