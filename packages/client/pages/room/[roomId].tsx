import Homepage from "../../views/Homepage";
import Lobby from "../../views/Lobby";
import Question from "../../views/Question";
import Choice from "../../views/Choice";
import Scores from "../../views/Scores";
import { ColyseusContext, MyContext } from "../../colyseus/use-room";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home({ myContext }: { myContext: MyContext }) {
  const state = useContext(ColyseusContext);
  const { query } = useRouter();
  const roomId = query.roomId as string;

  useEffect(() => {
    console.log({ state });
  }, [state]);

  return (
    <div className="space-y-10 bg-gradient-to-r to-pink-600 from-blue-700 w-screen h-screen flex-row p-20">
      {state.type !== "connected" ? (
        <Homepage myContext={myContext} roomId={roomId} />
      ) : state.step.type === "waiting" ? (
        <Lobby />
      ) : state.step.type === "write-description" ? (
        <Question />
      ) : state.step.type === "choose-word" ? (
        <Choice />
      ) : state.step.type === "end-screen" ? (
        <Scores />
      ) : (
        <div />
      )}
    </div>
  );
}
