// Colyseus + Express
import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport";
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./rooms/MyRoom";
import _ from "lodash";

const port = 2567;

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});

_.range(100).forEach((i) => {
  gameServer.define(`${i}`, MyRoom);
});

gameServer.listen(port);
