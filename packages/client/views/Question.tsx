import React, { useRef, useState } from "react";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const disabled = !answer;
  const [progressPercentage, setProgressPercentage] = useState(10);
  const [wordCount, setWordCount] = useState(0);
  const wordList = ["hello", "world"];
  var regexFromWordList = new RegExp(wordList.join("|"), 'gi');

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
            answer.match(/(\w+)/g) != null && setWordCount(answer.match(/(\w+)/g).length);
          }}
        ></textarea>
      </div>
      <Button
        className={progressPercentage < 20 && "animate-ping"}
        variant={disabled ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
        onClick={() => {
          if (!disabled) {
          }
        }}
      >
        Submit
      </Button>
      <p>{wordCount}</p>
    </div>
  );
}
