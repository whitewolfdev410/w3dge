import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  //   Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { StokeChartData } from "../../assets/stockchartdata";

const data = StokeChartData

// Function to format the YAxis values to 1k, 2k, etc.
const formatYAxis = (tickItem: any) => {
  return `${tickItem / 1000}k`;
};
export default function StokedBorChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        // margin={{
        //   top: 20,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />
        <XAxis dataKey="name" />
        <YAxis width={20} tickFormatter={formatYAxis} />
        {/* <Tooltip /> */}
        <Legend
          verticalAlign="bottom" // Places the legend at the bottom
          align="left" // Aligns the legend to the left side
          iconType="circle" // Displays the legend icons as circles
          iconSize={6}
        />
        <Bar dataKey="legend" stackId="a" fill="#16B1FF" barSize={7} />
        <Bar dataKey="uv" stackId="a" fill="#00B649" barSize={7} />
      </BarChart>
    </ResponsiveContainer>
  );
}
