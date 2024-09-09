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
            <stop stop-color="#00BB35" />
            <stop offset="1" stop-color="#05CD99" stop-opacity="0" />
          </linearGradient>
        </defs>
        <Pie
          data={data}
          cx={90}
          cy={90}
          startAngle={0}
          endAngle={300}
          innerRadius={65}
          outerRadius={80}
          dataKey="value"
          stroke="none"
        >
          <Cell key={`cell`} fill="url(#paint0_linear_1_14225)" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
