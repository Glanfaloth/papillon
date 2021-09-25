import React, { useState } from "react";
import { Button } from "../components/Button";
import { GiButterfly } from "react-icons/gi";
import { useColyseus } from "../colyseus/use-room";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const { connectToClient } = useColyseus();

  const disabled = !username;

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-4/5	">
      <div className="space-y-10">
        <span className="inline-grid grid-cols-3 gap-x-2 items-center">
          <span>
            <GiButterfly className="float-right " />
          </span>
          <h1>Welcome to Papillon</h1>
          <span>
            <GiButterfly className="float-left " />
          </span>
        </span>
        <h3 className="text-white pb-0">What is your name?</h3>
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
