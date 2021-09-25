import { QUESTION_DURATION_SECONDS } from "@papillon/helpers/lib/const";
import React, { useContext, useRef, useState } from "react";
import { ColyseusContext } from "../colyseus/use-room";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const disabled = !answer;
  const [wordCount, setWordCount] = useState(0);
  const wordList = ["hello", "world"];
  var regexFromWordList = new RegExp(wordList.join("|"), "gi");

  const state = useContext(ColyseusContext);

  function applyHighlights(text: string) {
    text = text
      .replace(/\n$/g, "\n\n")
      .replace(regexFromWordList, "<mark>$&</mark>");
    return text;
  }

  if (state.type !== "connected" || state.step.type !== "write-description")
    return <div />;

  const progressPercentage =
    100 -
    Math.floor(
      (100 * (QUESTION_DURATION_SECONDS - state.step.remainingTime)) /
        QUESTION_DURATION_SECONDS
    );
  const widthPercentage = (progressPercentage - 1) / 100 > 0 ? 100 : 0;

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <ProgressBar
        progressPercentage={widthPercentage}
        isDanger={progressPercentage < 20}
      />

      <h3 className="text-gray-600 pt-8">
        How would you describe the following word?
      </h3>
      <i className="text-gray-500">Hover to see its definition in English!</i>
      <div className="has-tooltip">
        <span className="tooltip rounded shadow-lg p-3 bg-gray-100 text-red-500 -mt-16">
          speak, say, talk
        </span>
        Sprechen
      </div>
      <div className="container">
        <div className="backdrop">
          <span
            dangerouslySetInnerHTML={{ __html: applyHighlights(answer) }}
            className="highlights mt-0 mb-auto ml-0 mr-auto"
          ></span>
        </div>
        <textarea
          className="border-gray-400 border-2 w-full"
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
      <div>
        {progressPercentage < 20 && (
          <Button
            className={progressPercentage < 20 && "animate-weakPing"}
            variant={disabled ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
            onClick={() => {
              if (!disabled) {
              }
            }}
          >
            Submit
          </Button>
        )}
        <div className={progressPercentage < 20 && "absolute"}>
          <Button
            variant={disabled ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
            onClick={() => {
              if (!disabled) {
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
