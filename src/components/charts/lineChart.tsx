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
    aggregatedData[month].uv += entry.amount * 0.1;
  });
  return Object.keys(aggregatedData).map((month) => ({
    name: month,
    amt: aggregatedData[month].amt,
    legend: aggregatedData[month].legend,
    uv: aggregatedData[month].uv,
  }));
};

export default function LineChartComponent({ boxViewPayoutData }: any) {
  const transformedData = transformData(boxViewPayoutData?.daily_payouts || []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
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
