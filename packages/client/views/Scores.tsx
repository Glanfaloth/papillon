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

export default function Scores() {
  const sortedData = _.sortBy(data, (o: typeof data[0]) => -1 * o.points);
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 overflow-hidden">
      <h1>Scores</h1>
      <BarChart width={300} height={100} data={sortedData}>
        <Bar dataKey="points" fill="white" />
        <XAxis
          dataKey="name"
          tick={{ stroke: "white", fill: "white" }}
          axisLine={false}
          tickLine={false}
        />
      </BarChart>
      <h1>Done</h1>
    </div>
  );
}
