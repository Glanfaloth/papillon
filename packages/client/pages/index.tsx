import Head from "next/head";
import Homepage from "../views/Homepage";
import Lobby from "../views/Lobby";
import Question from "../views/Question";
import Choice from "../views/Choice";
import Scores from "../views/Scores";

export default function Home() {
  return (
    <div className="space-y-10">
      <Homepage />
      <Lobby />
      <Question />
      <Choice />
      <Scores />
    </div>
  );
}
