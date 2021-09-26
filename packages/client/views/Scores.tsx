import React, { PureComponent, useContext, useEffect } from "react";
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
import { ColyseusContext } from "../colyseus/use-room";

const bar_color = ["#5187fc", "#53e48f", "#ff73dc", "#ff4f4f"];

// const data = useMemo(() => )

export default function Scores() {
  const state = useContext(ColyseusContext);

  const data = Object.entries(state.byUser)
    .map((u: any) => ({
      score: u[1].score,
      id: u[0],
      username: u[0],
    }))
    .filter((v) => v && v.id !== "undefined");
  useEffect(() => {
    console.log("data updated", data);
  }, [data]);

  const sortedData = _.sortBy(data, (o: typeof data[0]) => o.id);
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
