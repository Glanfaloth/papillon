import React from "react";
import { Button } from "../components/Button";

interface ProgressBarProps {
  progressPercentage: number;
  isDanger: boolean;
}

const ProgressBar = ({ progressPercentage, isDanger }: ProgressBarProps) => {
  return (
    <div className="h-8 md:h-6 w-full bg-gray-300 justify-start flex-row overflow-hidden">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`h-full bg-gradient-to-r${
          isDanger
            ? " from-purple-400 via-pink-500 to-red-500"
            : " from-blue-500 to-green-400"
        }`}
      />
    </div>
  );
};

export default function Question() {
  return (
    <div className="shadow-lg rounded-xl bg-gradient-to-r from-green-200 to-blue-300 p-8">
      <ProgressBar progressPercentage={80} isDanger={false} />
      <h2>30 seconds left</h2>
      <h3>How would you describe the following word?</h3>
      <h2>Sprechen</h2>
      <input type="text" name="description" className="w-full"></input>
      <Button>Submit</Button>
    </div>
  );
}
