import React from "react";
import { Button } from "../components/Button";
import { GiButterfly } from "react-icons/gi";

export default function Homepage() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 page-view overflow-hidden">
      <div className="space-y-10">
      <span className="inline-grid grid-cols-3 gap-x-4 items-center">
        <span>
          <GiButterfly className="float-right text-white" />
        </span>
        <h1 className="text-white">Welcome to Papillon</h1>
        <span>
          <GiButterfly className="float-left text-white" />
        </span>
      </span>
      <p className="text-white">What is your name?</p>
      <input type="text"></input>
      <Button onClick={() => {}}>Enter the Lobby</Button>
      </div>
    </div>
  );
}
