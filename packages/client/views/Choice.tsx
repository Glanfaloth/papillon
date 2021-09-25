import React from "react";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Choice() {
  const words = ["Sprechen", "Apfel", "Honig", "Tomate"];

  return (
    <div className="bg-gradient-to-r from-purple-400 to-red-500  overflow-hidden ">
      <div className="shadow-xl bg-white p-8 rounded-xl">
        <ProgressBar progressPercentage={80} isDanger={false} />
        <h3 className="pt-8 text-gray-600">
          Which word is does the following describe?
        </h3>
        <h1 className="pb-4">
          Es ist deine Mutter! Meine ist es jedoch nicht.
        </h1>
        <div className="flex-row space-x-4">
          {words.map((w) => (
            <Button>{w}</Button>
          ))}
        </div>
      </div>
    </div>
  );
}
