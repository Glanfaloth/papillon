import React from "react";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 overflow-hidden">
    <div className="shadow-lg rounded-xl bg-gradient-to-r from-green-200 to-blue-300 p-8">
      <ProgressBar progressPercentage={80} isDanger={false} />
      <h2>30 seconds left</h2>
      <h3>How would you describe the following word?</h3>
      <h2>Sprechen</h2>
      <input type="text" name="description" className="w-full"></input>
      <Button>Submit</Button>
    </div></div>
  );
}
