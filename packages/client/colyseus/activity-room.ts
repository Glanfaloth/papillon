import * as Colyseus from "colyseus.js";
import {
  JoinOptions,
  ClientToServerMessageUnion,
  StateForUser,
  RawState,
} from "@papillon/helpers/lib/types";
import { ROOM_NAME } from "@papillon/helpers/lib/const";
import _ from "lodash";
import { getUserStateFromRawState } from "./utils";

export class ActivityRoom {
  client: Colyseus.Client;
  room: Colyseus.Room<RawState>;
  sessionId: string;
  previousStateForUser: StateForUser;
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

  onStateChange = (callback: (state: StateForUser) => void) => {
    if (!this.room) throw new Error("No room found");

    this.room.onStateChange((all) => {
      const stateForUser = getUserStateFromRawState(all.state, this.username);

      callback(stateForUser);
    });
  };
}

export let activityRoom: ActivityRoom | null = null;

export const initActivityRoom = () => {
  activityRoom = new ActivityRoom();
};
