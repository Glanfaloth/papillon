import React, { useEffect } from "react";
import * as Colyseus from "colyseus.js";
import { JoinOptions } from "@papillon/helpers/lib/types/message";

const client = new Colyseus.Client("ws://localhost:2567");

export default function Waiting() {
  useEffect(() => {
    const options: JoinOptions = {
      username: 'elyes yes'
    }

    client
      .joinOrCreate("main_room", options)
      .then((room) => {
        console.log(room.sessionId, "joined", room.name);
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  }, []);

  return <h1>Waiting</h1>;
}
