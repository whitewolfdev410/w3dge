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
  return `${tickItem}`;
};

const transformData = (data: any[]) => {
  const aggregatedData: { [key: string]: { amt: number; Payout: number; uv: number } } = {};

  data.forEach((entry) => {
    const month = entry.date.slice(5)
    if (!aggregatedData[month]) {
      aggregatedData[month] = { amt: 0, Payout: 0, uv: 0 };
    }
    
    aggregatedData[month].amt += entry.total_payout;
    aggregatedData[month].Payout += entry.total_payout;
    aggregatedData[month].uv += entry.total_payout * 0.1;
  });
  return Object.keys(aggregatedData).map((month) => ({
    name: month,
    amt: aggregatedData[month].amt,
    Payout: aggregatedData[month].Payout,
    uv: aggregatedData[month].uv,
  }));
};

export default function LinePayoutChartComponent({ validatorPayoutdata }: any) {
  const transformedData = transformData(validatorPayoutdata || []);

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
          dataKey="Payout"
          stroke="#00B649"
          strokeWidth={3}
          //   activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
}
