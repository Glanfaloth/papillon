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
    <div className="bg-gradient-to-r from-green-200 to-blue-300 overflow-hidden">
      <div className="shadow-lg rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 p-8 text-white">
        <h1>Waiting for other players...</h1>
        <div className="fill-current bg-red-600  animate-spin h-5 w-5 mr-3">
          <svg className="" viewBox="0 0 24 24"></svg>
        </div>
      </div>
    </div>
  );
}
