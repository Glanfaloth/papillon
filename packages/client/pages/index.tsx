import Head from "next/head";
import Homepage from "../views/Homepage";
import Lobby from "../views/Lobby";
import Question from "../views/Question";
import Choice from "../views/Choice";
import Scores from "../views/Scores";
import { useColyseus } from "../colyseus/use-room";
import { useEffect } from "react";

export default function Home() {
  const { state } = useColyseus();

  useEffect(() => {
    console.log("state");
    console.log("Step is", state?.step);

    console.log(state);
  }, [state]);

  const step = state?.step;

  return (
    <div className="space-y-10 bg-gradient-to-r to-pink-600 from-blue-700 w-screen h-full flex-row p-20">
      {step?.type === undefined && <Homepage />}
      {step?.type === "waiting" && <Lobby />}
      {step?.type === "write-description" && <Question />}
      {step?.type === "choose-word" && <Choice />}
      {step?.type === "end-screen" && <Scores />}
      {/* <Lobby />
      <Question />
      <Choice />
      <Scores /> */}
    </div>
  );
}
