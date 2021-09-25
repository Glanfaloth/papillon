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
  ResponsiveContainer
} from "recharts";
import _ from "lodash";
import { GiWhiteBook } from "react-icons/gi";

const data = [
  {
    name: "Tomato",
    points: 100
  },
  {
    name: "Pesca",
    points: 232
  },
  {
    name: "Kiwi",
    points: 400
  },
  {
    name: "Fruit",
    points: 200
  }
];

const bar_color = ["#cb4335", "#28b463", "#3498db", "#f1c40f"];

export default function Scores() {
  const sortedData = _.sortBy(data, (o: typeof data[0]) => -1 * o.points);
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <h1>Scores</h1>
      <BarChart width={600} height={200} data={sortedData}>
        <Bar dataKey="points">
          {data.map((entry, index) => (
            <Cell fill={bar_color[index % 4]} key={`cell-${index}`} />
          ))}
        </Bar>
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
