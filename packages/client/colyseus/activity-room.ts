import * as Colyseus from "colyseus.js";
import {
  JoinOptions,
  ClientToServerMessageUnion,
  RawState,
  GlobalStateClient,
  GlobalStateClientFrontend,
} from "@papillon/helpers/lib/types";
import _ from "lodash";
import { getClientStateFromRawState } from "./utils";

export class ActivityRoom {
  client: Colyseus.Client;
  room: Colyseus.Room<RawState>;
  sessionId: string;
  previousClientState: GlobalStateClient;
  username: string;

  
  constructor() {
    console.log(window.location)
    this.client = new Colyseus.Client(`ws://${window.location.hostname}:2567`);
  }

  connect = async ({ roomId, ...options }: JoinOptions): Promise<void> => {
    try {
      console.log({roomId})
      this.client.getAvailableRooms().then(console.log)
      
      const room = (await this.client.joinOrCreate(
        roomId,
        options
      )) as Colyseus.Room<RawState>;

      this.room = room;
      this.sessionId = room.sessionId;
      this.username = options.username;
    } catch (error) {
      console.log(error);
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

  onStateChange = (callback: (state: GlobalStateClientFrontend) => void) => {
    if (!this.room) throw new Error("No room found");

    this.room.onStateChange(({ state }) => {
      const stateForUser = getClientStateFromRawState(state, this.username);

      callback({ ...stateForUser, username: this.username, type: "connected" });
    });
  };
}

export let activityRoom: ActivityRoom | null = null;

export const initActivityRoom = () => {
  activityRoom = new ActivityRoom();
};
