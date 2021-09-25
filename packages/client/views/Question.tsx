import React, { useRef, useState } from "react";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const [value, setValue] = useState("X Y Z and then XYZ");
  const disabled = !answer;
  const [progressPercentage, setProgressPercentage] = useState(10);

  function applyHighlights(text: string) {
    text = text
      .replace(/\n$/g, "\n\n")
      .replace(/[A-Z].*?\b/g, "<mark>$&</mark>");
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
            className="highlights"
          ></span>
        </div>
        <textarea
          className="border-gray-400 border-2 w-full"
          name="description"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
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
    </div>
  );
}
