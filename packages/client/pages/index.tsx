import Head from "next/head";
import Waiting from "../components/Waiting";
import Homepage from "../components/Homepage";
import Question from "../components/Question";

export default function Home() {
  return (
    <div>
      <Waiting />
      <Question />
      <Homepage />
    </div>
  );
}
