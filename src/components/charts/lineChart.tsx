import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "JAN",
    uv: 4000,
    legend: 2400,
    amt: 2400,
  },
  {
    name: "FEB",
    uv: 3000,
    legend: 1398,
    amt: 2210,
  },
  {
    name: "MAR",
    uv: 2000,
    legend: 9800,
    amt: 2290,
  },
  {
    name: "APR",
    uv: 2780,
    legend: 3908,
    amt: 2000,
  },
  {
    name: "MAY",
    uv: 1890,
    legend: 4800,
    amt: 2181,
  },
  {
    name: "JUN",
    uv: 2390,
    legend: 3800,
    amt: 2500,
  },
];

// Function to format the YAxis values to 1k, 2k, etc.
const formatYAxis = (tickItem: any) => {
  return `${tickItem / 1000}k`;
};
export default function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        // width={500}
        // height={300}
        data={data}
        // margin={{
        //   top: 5,
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
        <Tooltip />
        <Legend
          verticalAlign="bottom" // Places the legend at the bottom
          align="left" // Aligns the legend to the left side
          iconType="circle" // Displays the legend icons as circles
          iconSize={6}
        />
        <Line
          type="monotone"
          dataKey="legend"
          stroke="#00B649"
          strokeWidth={3}
          //   activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}
