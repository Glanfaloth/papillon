import * as Colyseus from "colyseus.js";
import { useCallback, useEffect } from "react";
import { JoinOptions, MessageUnion } from "@papillon/helpers/lib/types";
import { ROOM_NAME } from "@papillon/helpers/lib/const";

class ActivityRoom {
  client: Colyseus.Client;
  room: Colyseus.Room;
  sessionId: string;

  constructor() {
    this.client = new Colyseus.Client("ws://localhost:2567");
  }

  connect = async (options: JoinOptions): Promise<void> => {
    try {
      const room = await this.client.joinById(ROOM_NAME, options);
      this.room = room;
      this.sessionId = room.sessionId;
    } catch (error) {
      console.error(error);
    }
  };

  sendMessage = (message: MessageUnion) => {
    if (!this.room) throw new Error("No room found");

    this.room.send(message.type, message.properties);
  };

  removeAllListeners = () => {
    if (!this.room) throw new Error("No room found");

    this.room.removeAllListeners();
  };
}

const activityRoom = new ActivityRoom();

export const useColyseus = () => {
  const connectToClient = useCallback(
    (options: JoinOptions) => activityRoom.connect(options),
    []
  );

  const sendMessage = useCallback(
    (message: MessageUnion) => activityRoom.sendMessage(message),
    []
  );

  useEffect(() => {
    return () => activityRoom.removeAllListeners();
  }, []);

  return { connectToClient, sendMessage }
};
