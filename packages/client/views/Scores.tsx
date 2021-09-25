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
    points: 100,
  },
  {
    name: "Pesca",
    points: 232,
  },
  {
    name: "Kiwi",
    points: 400,
  },
  {
    name: "Fruit",
    points: 200,
  },
];

const bar_color = ["#cb4335", "#28b463", "#3498db", "#f1c40f"]

export default function Scores() {
  const sortedData = _.sortBy(data, (o: typeof data[0]) => -1 * o.points);
  return (

    <div className="bg-gradient-to-r from-green-200 to-blue-300 overflow-hidden">
      <div className="shadow-lg rounded-xl bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 p-8">
        <h1>Scores</h1>
        <BarChart width={300} height={100} data={sortedData}>
          <Bar dataKey="points">
            {data.map((entry, index) => (
              <Cell fill={bar_color[index % 4]} key={`cell-${index}`} />
            ))}
          </Bar>
          <XAxis
            dataKey="name"
            tick={{ stroke: "white", fill: "white" }}
            axisLine={false}
            tickLine={false}
          />
        </BarChart>
      </div>
    </div>
  );
}
