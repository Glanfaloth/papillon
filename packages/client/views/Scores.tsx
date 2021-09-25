import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import _ from "lodash";
import { GiWhiteBook } from "react-icons/gi";

const data = [
  {
    name: "Tomato",
    points: 10,
  },
  {
    name: "Pesca",
    points: 22,
  },
  {
    name: "Kiwi",
    points: 12,
  },
  {
    name: "Fruit",
    points: 3,
  },
];

const bar_color = ["#cb4335", "#28b463", "#3498db", "#f1c40f"];

export default function Scores() {
  const sortedData = _.sortBy(data, (o: typeof data[0]) => -1 * o.points);
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <h1>Scores</h1>
      <BarChart width={600} height={200} data={sortedData}>
        <Bar dataKey="points" label={{ position: "top" }}>
          {data.map((entry, index) => (
            <Cell fill={bar_color[index % 4]} key={`cell-${index}`} />
          ))}
        </Bar>
        <YAxis
          type="number"
          domain={[0, "dataMax"]}
          padding={{ top: 15 }}
          tickLine={false}
          axisLine={false}
          tick={false}
        />
        <XAxis
          dataKey="name"
          tick={{ stroke: "black", fill: "black" }}
          axisLine={false}
          tickLine={false}
        />
      </BarChart>
    </div>
  );
}
