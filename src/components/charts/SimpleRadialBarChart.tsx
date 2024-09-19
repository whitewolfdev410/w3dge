import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [{ name: "Group A", value: 400 }];

export default function PureComponent() {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <defs xmlns="http://www.w3.org/2000/svg">
          <linearGradient
            id="paint0_linear_1_14225"
            x1="75"
            y1="0"
            x2="75"
            y2="138.35"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#00BB35" />
            <stop offset="1" stopColor="#05CD99" stopOpacity="0" />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          cx={66}
          cy={66}
          innerRadius={50}
          outerRadius={60}
          startAngle={300}
          endAngle={0}
          dataKey="value"
          stroke="none"
        >
          <Cell key={`cell`} fill="url(#paint0_linear_1_14225)" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
