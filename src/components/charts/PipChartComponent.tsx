import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [{ name: "Group A", value: 400 }];

export default function PieChartComponent(props: any) {
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart width={800} height={400}>
        <Pie
          data={data}
          cx={66}
          cy={66}
          innerRadius={50}
          outerRadius={60}
          fill="#8884d8"
          //   paddingAngle={0}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={props.color} />
        </Pie>
        {/* <Pie
          data={data}
          cx={420}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie> */}
      </PieChart>
    </ResponsiveContainer>
  );
}
