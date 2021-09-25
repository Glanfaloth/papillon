// Colyseus + Express
import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./rooms/MyRoom";
import { ROOM_NAME } from "@papillon/helpers/lib/const";

const port = 2567;

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});

gameServer.define(ROOM_NAME, MyRoom);

gameServer.listen(port);
