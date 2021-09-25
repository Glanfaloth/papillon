import Head from "next/head";
import Homepage from "../components/Homepage";
import Waiting from "../components/Waiting";
import Question from "../components/Question";
import Choice from "../components/Choice";
import Score from "../components/Scores";

export default function Home() {
  return (
    <div>
      <Homepage />
      <Waiting />
      <Question />
      <Choice />
      <Score />
    </div>
  );
}
