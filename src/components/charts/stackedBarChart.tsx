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

// Function to format the YAxis values to 1k, 2k, etc.
const formatYAxis = (tickItem: any) => {
  return `${tickItem / 1000}k`;
};
const transformData = (data: any[]) => {
  const aggregatedData: { [key: string]: { amt: number; legend: number; uv: number } } = {};

  data.forEach((entry) => {
    const month = entry.date
    if (!aggregatedData[month]) {
      aggregatedData[month] = { amt: 0, legend: 0, uv: 0 };
    }
    
    aggregatedData[month].amt += entry.amount;
    aggregatedData[month].legend += entry.amount;
    aggregatedData[month].uv += entry.amount * 0.3;
  });
  return Object.keys(aggregatedData).map((month) => ({
    name: month,
    amt: aggregatedData[month].amt,
    legend: aggregatedData[month].legend,
    uv: aggregatedData[month].uv,
  }));
};
export default function StokedBorChartComponent({boxViewPayoutData}: any) {
  const transformedData = transformData(boxViewPayoutData?.daily_payouts || []);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={transformedData}
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
        <Bar dataKey="legend" stackId="a" fill="#16B1FF" barSize={7} name={'Earning'}/>
        <Bar dataKey="uv" stackId="a" fill="#00B649" barSize={7} name={'Network Contribution'}/>
      </BarChart>
    </ResponsiveContainer>
  );
}
