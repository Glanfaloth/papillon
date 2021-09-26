import React, { useContext, useState } from "react";
import { Button, ButtonVariant } from "../components/Button";
import { GiButterfly } from "react-icons/gi";
import {
  ColyseusContext,
  MyContext,
  useConnectColyseus,
} from "../colyseus/use-room";

export default function Homepage({
  myContext: { context, setContext },
  roomId,
}: {
  myContext: MyContext;
  roomId: string;
}) {
  const [username, setUsername] = useState("");
  const state = useContext(ColyseusContext);
  const { connectToClient } = useConnectColyseus(context, setContext);

  const disabled = !username;
  const userSubmittedName = state.type === "connected";

  return (
    <div className="shadow-xl bg-white p-2 py-8 md:p-8 rounded-xl flex">
      <span className="py-12 my-12">
        <div className="butterfly">
          <div className="wing">
            <div className="bit"></div>
            <div className="bit"></div>
          </div>
          <div className="wing">
            <div className="bit"></div>
            <div className="bit"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </span>
      <div className="space-y-4">
        <h3>Wie ist dein Name?</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mx-4 md:mx-0 md:w-auto"
        />
        <Button
          variant={disabled ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
          onClick={() => {
            if (!disabled) {
              connectToClient({ username, roomId });
            }
          }}
        >
          Lobby betreten
        </Button>
      </div>
    </div>
  );
}
