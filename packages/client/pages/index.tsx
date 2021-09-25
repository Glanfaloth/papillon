import Head from "next/head";
import Waiting from "../components/WaitingLobby";
import Homepage from "../components/Homepage";
import Question from "../components/Question";
import Winner from "../components/Winner";

export default function Home() {
  return (
    <div>
      <Waiting />
      <Question />
      <Homepage />
      <Winner />
    </div>
  );
}
