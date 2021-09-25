import React from "react";
import { Button } from "../components/Button";
import { GiButterfly } from "react-icons/gi";

export default function Homepage() {
  return (
    <div>
      <span className="inline-grid grid-cols-3 gap-x-4 items-center">
        <span>
          <GiButterfly className="float-right" />
        </span>
        <h1>Welcome to Papillon</h1>
        <span>
          <GiButterfly className="float-left" />
        </span>
      </span>
      <p>What is your name?</p>
      <input type="text"></input>
      <Button onClick={() => {}}>Enter the Lobby</Button>
    </div>
  );
}
