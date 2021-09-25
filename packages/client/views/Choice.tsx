import React from "react";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";

export default function Choice() {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-red-500 to-white-500 page-view overflow-hidden">
    <div className="shadow-lg rounded-xl bg-gradient-to-r from-green-200 to-blue-300 p-8">
      <ProgressBar progressPercentage={80} isDanger={false} />
      <h2>30 seconds left</h2>
      <h3>Which word is described here?</h3>
      <h2>Es ist deine Mutter! Meine ist es jedoch nicht.</h2>
      <div className="flex-row space-x-4">
        <Button>Sprechen</Button>
        <Button>Apfel</Button>
        <Button>Honig</Button>
        <Button>Tomatenpüree</Button>
      </div>
    </div>
    </div>
  );
}
