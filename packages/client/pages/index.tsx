import Head from "next/head";
import Homepage from "../views/Homepage";
import Lobby from "../views/Lobby";
import Question from "../views/Question";
import Choice from "../views/Choice";
import Score from "../views/Scores";

export default function Home() {
  return (
    <div>
      <Homepage />
      <Lobby />
      <Question />
      <Choice />
      <Score />
    </div>
  );
}
