import React, { useEffect } from "react";
import * as Colyseus from "colyseus.js";
import { JoinOptions } from "@papillon/helpers/lib/types";
import { ROOM_NAME } from "@papillon/helpers/lib/const";

const client = new Colyseus.Client("ws://localhost:2567");

export default function Waiting() {

  return <h1>Waiting</h1>;
}
