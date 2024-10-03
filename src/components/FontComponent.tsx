import LogoImage from "../assets/images/logoAndText.png";

function HeroHeading({ text }: { text: string }) {
  return (
    <div className="flex items-center pt-10 lg:pt-0 lg:-mt-[3.5rem]">
      <div className="hidden lg:flex">
        <img src={LogoImage} alt="logo" className="w-28" />
        {/* <LogoText key="hero_header" /> */}
      </div>
      <h1 className="font-GBold text-[2.5rem] pt-3 md:pt-0 lg:text-[5rem] font-bold text-white">
        {text}
      </h1>
    </div>
  );
}
function HeroHeadingTwo({
  text,
  isCenter,
}: {
  text: string;
  isCenter?: boolean;
}) {
  return (
    <h2
      className={`font-bold font-GBold text-[3rem] text-white ${
        isCenter ? "text-center" : ""
      }`}
    >
      {text}
    </h2>
  );
}
function Heading1({ text, isHidden }: { text: string; isHidden?: boolean }) {
  return (
    <h1
      className={`text-white font-bold font-GBold text-2xl xl:text-start text-center ${
        isHidden ? "hidden xl:flex" : ""
      }`}
    >
      {text}
    </h1>
  );
}
function Heading5({ text, style }: { text: string; style?: string }) {
  return (
    <h5 className={`${style} text-white font-normal font-GBold text-sm`}>
      {text}
    </h5>
  );
}
function Heading6({ text, style }: { text: string; style?: string }) {
  return (
    <h6 className={`${style} text-white font-thin font-GRegular text-sm`}>
      {text}
    </h6>
  );
}

//body

function Bodoy1({ text, style }: { text: string; style?: string }) {
  return (
    <p className={`${style} text-sm font-normal font-GRegular text-grey-grey1`}>
      {text}
    </p>
  );
}
export { Heading1, HeroHeading, Bodoy1, Heading5, Heading6, HeroHeadingTwo };
