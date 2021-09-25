import Head from "next/head";
import Lobby from "../components/Lobby";
import Homepage from "../components/Homepage";
import Question from "../components/Question";

export default function Home() {
  return (
    <div>
      <Lobby />
      <Question />
      <Homepage />
    </div>
  );
}
