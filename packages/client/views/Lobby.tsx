import React, { useEffect } from "react";
import * as Colyseus from "colyseus.js";
import { JoinOptions } from "@papillon/helpers/lib/types/message";
import { VscLoading } from "react-icons/vsc";

const client = new Colyseus.Client("ws://localhost:2567");

export default function Lobby() {
  useEffect(() => {
    const options: JoinOptions = {
      username: "elyes yes",
    };

    client
      .joinOrCreate("main_room", options)
      .then((room) => {
        console.log(room.sessionId, "joined", room.name);
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  }, []);

  return (
    <div>
      <h1>Waiting for other players...</h1>
      <VscLoading />
    </div>
  );
}
