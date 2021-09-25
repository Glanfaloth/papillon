import React, { useState } from "react";
import { Button } from "../components/Button";
import { GiButterfly } from "react-icons/gi";
import { useColyseus } from "../colyseus/use-room";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const { connectToClient } = useColyseus();

  const disabled = !username;

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 overflow-hidden">
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
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!disabled) {
              connectToClient({ username });
            }
          }}
        >
          Enter the Lobby
        </Button>
      </div>
    </div>
  );
}
