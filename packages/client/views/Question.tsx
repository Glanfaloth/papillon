import { QUESTION_DURATION_SECONDS } from "@papillon/helpers/lib/const";
import React, { useContext, useRef, useState } from "react";
import { ColyseusContext, useColyseus } from "../colyseus/use-room";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const disabled = !answer;
  const [wordCount, setWordCount] = useState(0);
  const wordList = ["hello", "world"];
  const [submitted, setSubmitted] = useState(false);
  var regexFromWordList = new RegExp(wordList.join("|"), "gi");

  const state = useContext(ColyseusContext);

  const { sendMessage } = useColyseus();

  function applyHighlights(text: string) {
    text = text
      .replace(/\n$/g, "\n\n")
      .replace(regexFromWordList, "<mark>$&</mark>");
    return text;
  }

  // if (state.type !== "connected" || state.step.type !== "write-description")
  //   return <div />;

  const progressPercentage =
    100 -
    Math.floor(
      (100 * (QUESTION_DURATION_SECONDS - (state.step?.remainingTime ?? 0))) /
        QUESTION_DURATION_SECONDS
    );

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <ProgressBar
        progressPercentage={progressPercentage}
        isDanger={progressPercentage < 20}
      />

      <h3 className="text-gray-600 pt-8">
        How would you describe the following word?
      </h3>
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-3 bg-gray-100 text-red-500 -mt-16">
          speak, say, talk
        </span>
        <h1>Sprechen</h1>
      </div>
      <div className="container ">
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
            variant={submitted ? ButtonVariant.DISABLED : ButtonVariant.PRIMARY}
            onClick={() => {
              if (!submitted) {
                setSubmitted(true);
                sendMessage({
                  type: "submit-description",
                  properties: {
                    username: state.username ?? 0,
                    word: "",
                    score: 0,
                    description: answer,
                  },
                });
              }
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
