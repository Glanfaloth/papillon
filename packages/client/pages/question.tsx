import Homepage from "../views/Homepage";
import Lobby from "../views/Lobby";

import Choice from "../views/Choice";
import Scores from "../views/Scores";
import { MyContext } from "../colyseus/use-room";
import { ROOM_ID } from "@papillon/helpers/lib/const";

export default function Home({ myContext }: { myContext: MyContext }) {
  return (
    <div className="space-y-10 bg-gradient-to-r to-pink-600 from-blue-700 w-screen h-screen flex-row p-4 md:p-20 lg:p-64">
      <Question />
    </div>
  );
}

import { QUESTION_DURATION_SECONDS } from "@papillon/helpers/lib/const";
import React, { useContext, useRef, useState } from "react";
import { ColyseusContext, useColyseus } from "../colyseus/use-room";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function Question() {
  const [answer, setAnswer] = useState("");
  const disabled = !answer;
  const [wordCount, setWordCount] = useState(0);
  const wordList = ["hello", "world"];
  const [submitted, setSubmitted] = useState(false);
  var regexFromWordList = new RegExp(wordList.join("|"), "gi");
  const widthPercentage = 50;
  const progressPercentage = 50;

  function applyHighlights(text: string) {
    text = text
      .replace(/\n$/g, "\n\n")
      .replace(regexFromWordList, "<mark>$&</mark>");
    return text;
  }
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      {widthPercentage >= 0 && (
        <ProgressBar
          progressPercentage={widthPercentage}
          isDanger={progressPercentage < 20}
        />
      )}

      {widthPercentage >= 0 && (
        <div>
          <h3 className="text-gray-600 pt-8">
            How would you describe the following word?
          </h3>
          <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-3 bg-gray-100 text-red-500 -mt-16">
              speak, say, talk
            </span>
            <div className="flex flex-row content-center">
              <h2 className="mr-2">Sprechen</h2>
              <h2>
                <AiOutlineQuestionCircle className="text-blue-500" />
              </h2>
            </div>
          </div>
          <div className="container">
            <div className="backdrop">
              <span
                dangerouslySetInnerHTML={{ __html: applyHighlights(answer) }}
                className="highlights mt-0 mb-auto ml-0 mr-auto"
              ></span>
            </div>
            <textarea
              className={`border-gray-400 border-2 w-full ${
                submitted && "text-gray-500"
              }`}
              name="description"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                answer.match(regexFromWordList) != null
                  ? setWordCount(answer.match(regexFromWordList).length)
                  : setWordCount(0);
              }}
            ></textarea>
          </div>
          {wordCount > 0 && (
            <h2 className="text-red-600">
              {wordCount} words too similar, you'll be penalized.
            </h2>
          )}
          <div className="mt-10">
            {progressPercentage < 20 && !submitted && (
              <Button
                className={progressPercentage < 20 && "animate-weakPing"}
                variant={
                  submitted ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY
                }
              >
                Submit
              </Button>
            )}
            <div className={progressPercentage < 20 && "absolute"}>
              <Button
                variant={
                  submitted ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY
                }
                onClick={() => {
                  if (!submitted) {
                    setSubmitted(true);
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
      {widthPercentage <= 0 && (
        <div>
          <h2 className="mr-2">
            Great!
            <br />
            <br />
          </h2>
          <h1 className="text-4xl animate-bounce">😊</h1>
          <h3 className="text-gray-600 pt-8">
            Now let us have a look at other people's descriptions!
          </h3>
        </div>
      )}
    </div>
  );
}
