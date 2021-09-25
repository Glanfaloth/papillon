import Head from "next/head";
import Lobby from "../components/Lobby";
import Homepage from "../components/Homepage";
import Question from "../components/Question";
import Winner from "../components/Winner";

export default function Home() {
  return (
    <div>
      <Lobby />
      <Question />
      <Homepage />
      <Winner />
    </div>
  );
}
