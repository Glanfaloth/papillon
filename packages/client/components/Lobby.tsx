import React, { useEffect } from "react";
import * as Colyseus from "colyseus.js";

const client = new Colyseus.Client("ws://localhost:2567");

export default function Lobby() {
  useEffect(() => {
    client
      .joinOrCreate("main_room")
      .then((room) => {
        console.log(room.sessionId, "joined", room.name);
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  }, []);

  return <h1>Waiting</h1>;
}
