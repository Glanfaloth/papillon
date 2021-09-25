import * as Colyseus from "colyseus.js";
import {
  JoinOptions,
  ClientToServerMessageUnion,
  RawState,
  GlobalStateClient,
} from "@papillon/helpers/lib/types";
import { ROOM_NAME } from "@papillon/helpers/lib/const";
import _ from "lodash";
import { getClientStateFromRawState } from "./utils";

export class ActivityRoom {
  client: Colyseus.Client;
  room: Colyseus.Room<RawState>;
  sessionId: string;
  previousClientState: GlobalStateClient;
  username: string;

  constructor() {
    this.client = new Colyseus.Client("ws://localhost:2567");
  }

  connect = async (options: JoinOptions): Promise<void> => {
    try {
      const room = (await this.client.joinOrCreate(
        ROOM_NAME,
        options
      )) as Colyseus.Room<RawState>;

      this.room = room;
      this.sessionId = room.sessionId;
      this.username = options.username;
    } catch (error) {
      throw new Error(error);
    }
  };

  sendMessage = (message: ClientToServerMessageUnion) => {
    if (!this.room) throw new Error("No room found");

    this.room.send(message.type, message.properties);
  };

  removeAllListeners = () => {
    if (!this.room) throw new Error("No room found");

    this.room.removeAllListeners();
  };

  onStateChange = (
    callback: (state: GlobalStateClient) => void
  ) => {
    if (!this.room) throw new Error("No room found");

    this.room.onStateChange(({ state }) => {
      const stateForUser = getClientStateFromRawState(state, this.username);

      callback({ ...stateForUser, username: this.username });
    });
  };
}

export let activityRoom: ActivityRoom | null = null;

export const initActivityRoom = () => {
  activityRoom = new ActivityRoom();
};
