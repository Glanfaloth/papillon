// Colyseus + Express
import { Server } from "colyseus";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { createServer } from "http";
import express from "express";
import { MyRoom } from "./rooms/MyRoom";
const port = 2567;

const app = express();
app.use(express.json());

const gameServer = new Server({
  transport: new WebSocketTransport({
    server: createServer(app),
  }),
});

gameServer.define("main_room", MyRoom);

gameServer.listen(port);
