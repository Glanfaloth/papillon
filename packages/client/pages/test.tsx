import Homepage from "../views/Homepage";
import Lobby from "../views/Lobby";
import Question from "../views/Question";
import Choice from "../views/Choice";
import Scores from "../views/Scores";
import { MyContext } from "../colyseus/use-room";

export default function Home({ myContext }: { myContext: MyContext }) {
  return (
    <div className="space-y-10 bg-gradient-to-r to-pink-600 from-blue-700 w-screen h-full flex-row p-20">
      <Homepage myContext={myContext}/>
      <Lobby />
      <Question />
      <Choice />
      <Scores />
    </div>
  );
}
