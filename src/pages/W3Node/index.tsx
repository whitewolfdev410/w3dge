import LineChartComponent from "../../components/charts/lineChart";
import StokedBorChartComponent from "../../components/charts/stackedBarChart";
import { Bodoy1, HeroHeading } from "../../components/FontComponent";
import BoostPayout from "../../components/w3NodeComponents/BoostPayout";
import Footer from "../../components/footer";
import ImageSwap from "../../components/w3NodeComponents/ImageSwap";
import NodeBackground from "../../assets/images/node_background.png";

function W3Node() {
  return (
    <div className="section-node p-5">
      <div className="grid row">
        <HeroHeading text={"Node View"} />
      </div>
      <div className=" row grid lg:grid-cols-[30%_70%]  xl:grid-cols-[20%_60%_20%] pt-16">
        <div className="flex flex-wrap mt-10 xl:mt-0 justify-center xl:justify-start gap-8 ">
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance" style={"!pb-3"} />
            <LineChartComponent />
          </div>
          <div className="w-80 h-60 grid bg-dark-main p-4 rounded-xl">
            <Bodoy1 text="Preformance 2" style={"!pb-3"} />
            <StokedBorChartComponent />
          </div>
        </div>
        <div
          className="flex-1 grid items-center  gl:pt-0  bg-center bg-no-repeat mt-10 xl:mt-0"
          style={{
            backgroundImage: `url(${NodeBackground})`,
            backgroundSize: "130% 130%",
          }}
        >
          <ImageSwap />
        </div>
        <div className=" mt-10 xl:mt-0 flex justify-center xl:justify-start items-center">
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
      <div className="pt-16 grid  xl:pr-28">
        <Footer />
      </div>
    </div>
  );
}

export default W3Node;
