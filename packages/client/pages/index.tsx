import Head from "next/head";
import Homepage from "../components/Homepage";
import Lobby from "../components/Lobby";
import Question from "../components/Question";
import Choice from "../components/Choice";
import Scores from "../components/Scores";

export default function Home() {
  return (
    <div>
      <Homepage />
      <Lobby />
      <Question />
      <Choice />
      <Scores />
    </div>
  );
}
