import React, { useEffect } from "react";
import * as Colyseus from "colyseus.js";
import { JoinOptions } from "@papillon/helpers/lib/types";
import { VscLoading } from "react-icons/vsc";
import { ROOM_NAME } from "@papillon/helpers/lib/const";

const client = new Colyseus.Client("ws://localhost:2567");

export default function Lobby() {
  useEffect(() => {
    const options: JoinOptions = {
      username: "elyes yes",
    };

    client
      .joinOrCreate(ROOM_NAME, options)
      .then((room) => {
        console.log(room.sessionId, "joined", room.name);
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-400 via-red-500 to-white-500 page-view overflow-hidden">
      <h1>Waiting for other players...</h1>
      <VscLoading />
    </div>
  );
}
