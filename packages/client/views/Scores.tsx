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
import { GlobalState } from "../../helpers/lib/types";

const bar_color = ["#5187fc", "#53e48f", "#ff73dc", "#ff4f4f"];

// const data = useMemo(() => )

export default function Scores() {
  const state: any = useContext(ColyseusContext);

  const data = Object.entries(state.byUser)
    .map((u: any) => ({
      score: u[1].score,
      id: u[0],
      name: u[0],
    }))
    .filter((v) => v && v.id !== "undefined");

  useEffect(() => {
    console.log("data updated", data);
  }, [data]);

  const winner = _.maxBy(data, (e) => e.score);

  const sortedData = _.sortBy(data, (o: typeof data[0]) => o.id);
  return (
    <div
      className="shadow-xl bg-white p-8 rounded-xl w-full
    "
    >
      <h1>Scores</h1>
      <div className="h-52 w-full">
        <ResponsiveContainer>
          <BarChart data={sortedData}>
            <Bar dataKey="score" label={{ position: "top" }}>
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
              width={0}
              hide={true}
            />
            <XAxis
              dataKey="name"
              tick={{ stroke: "black", fill: "black" }}
              axisLine={false}
              tickLine={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="animate-entry">
        <br />
        <br />
        <h1>The winner is {winner.name}!</h1>
        <br />
        <br />
      </div>
    </div>
  );
}
