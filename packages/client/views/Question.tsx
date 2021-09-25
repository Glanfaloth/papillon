import React from "react";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Question() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 overflow-hidden">
      <div className="shadow-lg rounded-xl bg-white p-8">
        <ProgressBar progressPercentage={80} isDanger={false} />

        <h3 className="text-gray-600 pt-8">
          How would you describe the following word?
        </h3>
        <h1>Sprechen</h1>
        <input type="text" name="description" className="w-full"></input>
        <Button>Submit</Button>
      </div>
    </div>
  );
}
