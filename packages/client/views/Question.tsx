import React, { useRef, useState } from "react";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const disabled = !answer;
  const [progressPercentage, setProgressPercentage] = useState(10);
  const [wordCount, setWordCount] = useState(0);
  const wordList = ["hello", "world"];
  var regexFromWordList = new RegExp(wordList.join("|"), "gi");

  function applyHighlights(text: string) {
    text = text
      .replace(/\n$/g, "\n\n")
      .replace(regexFromWordList, "<mark>$&</mark>");
    return text;
  }

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <ProgressBar
        progressPercentage={progressPercentage}
        isDanger={progressPercentage < 20}
      />

      <h3 className="text-gray-600 pt-8">
        How would you describe the following word?
      </h3>
      <h1>Sprechen</h1>
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
