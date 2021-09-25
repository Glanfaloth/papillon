import React, { useContext, useState } from "react";
import { Button, ButtonVariant } from "../components/Button";
import { GiButterfly } from "react-icons/gi";
import { ColyseusContext, MyContext, useConnectColyseus } from "../colyseus/use-room";
import { GlobalState, GlobalStateClient } from "@papillon/helpers/lib/types";

export default function Homepage({
  myContext: { context, setContext },
}: {
  myContext: MyContext;
}) {
  const [username, setUsername] = useState("");
  const state = useContext(ColyseusContext);
  const { connectToClient } = useConnectColyseus(context, setContext);

  const disabled = !username;
  const userSubmittedName = state.type === 'connected';

  return (
    <div className="shadow-xl bg-white p-8 rounded-xl w-full h-full	">
      {/* Use this to render username form vs spinner */}
      {userSubmittedName ? "waiting" : "fill in form..."}
      <div className="space-y-10">
        <div className="inline-grid grid-cols-3 gap-x-2 items-center">
          <span>
            <GiButterfly className="float-right " />
          </span>
          <h1>Welcome to Papillon</h1>
          <span>
            <GiButterfly className="float-left " />
          </span>
        </div>
        <h3>What is your name?</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant={disabled ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
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
