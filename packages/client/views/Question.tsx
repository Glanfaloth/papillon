import React, { useState } from "react";
import { Button, ButtonVariant } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  const [answer, setAnswer] = useState("");
  const [value, setValue] = useState("X Y Z and then XYZ");
  const disabled = !answer;
  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full	">
      <ProgressBar progressPercentage={80} isDanger={false} />
      <h3 className="text-gray-600 pt-8">
        How would you describe the following word?
      </h3>
      <h1>Sprechen</h1>
      <textarea
        className="border-gray-400 border-2 w-full"
        name="description"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
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
  );
}
