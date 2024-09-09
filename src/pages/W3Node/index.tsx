import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import Footer from "../../components/footer";
import ImageSwap from "../../components/w3NodeComponents/ImageSwap";
import ImageOne from "../../assets/images/background_pattern.png";
import ImageTwo from "../../assets/images/ellipse_8.png";

function W3Node() {
  return (
    <div className="section-node p-7">
      <img
        src={ImageOne}
        style={{
          position: "fixed",
          width: "45%",
          height: "45%",
          top: "30%",
          left: "27%",
          zIndex: -1,
        }}
      />
      <img
        src={ImageTwo}
        style={{
          position: "fixed",
          top: "-50px",
          left: "0px",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      />
      <div className="grid row">
        <HeroHeading text={"Node View"} />
      </div>
      <div className=" row grid lg:grid-cols-[30%_70%]  xl:grid-cols-[25%_50%_25%]">
        <div className="flex flex-wrap justify-center gap-5">
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance" style={"!pb-3"} />
            <LineChartComponent />
          </div>
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance 2" style={"!pb-3"} />
            <StokedBorChartComponent />
          </div>
        </div>
        <div className="flex-1 grid items-center mt-10 gl:mt-0">
          <ImageSwap />
        </div>
        <div className=" mt-10 xl:mt-0 flex justify-center">
          <div className="max-w-80 w-fit">
            <BoostPayout
              title="Boost your payout"
              precentage="20%"
              amount="10.000"
              stockNow
              validators={false}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default W3Node;
