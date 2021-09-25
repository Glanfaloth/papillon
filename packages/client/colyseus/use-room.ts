import { useCallback, useEffect, useRef, useState } from "react";
import {
  JoinOptions,
  ClientToServerMessageUnion,
  GlobalStateClientFrontend,
} from "@papillon/helpers/lib/types";
import _ from "lodash";
import { activityRoom, initActivityRoom } from "./activity-room";
import React from "react";

export const ColyseusContext = React.createContext<GlobalStateClientFrontend>({
  type: "loading",
});

export type MyContext = {
  context: GlobalStateClientFrontend;
  setContext: (_: GlobalStateClientFrontend) => void;
};

export const useSetupColyseus = (
  state: GlobalStateClientFrontend,
  setState: (_: GlobalStateClientFrontend) => void
) => {
  const isSetup = useRef(false);

  useEffect(() => {
    if (state.type !== "loading" || isSetup.current) return;

    initActivityRoom();

    setState({ type: "room-initialised" });

    // return () => {
    //   activityRoom?.removeAllListeners();
    // }
  }, [state]);
};

export const useConnectColyseus = (
  state: GlobalStateClientFrontend,
  setState: (_: GlobalStateClientFrontend) => void
) => {
  const [connectedToClient, setConnectedToClient] = useState(false);

  const connectToClient = async (options: JoinOptions) => {
    if (!activityRoom || state.type !== "room-initialised") return;

    await activityRoom.connect(options);

    setConnectedToClient(true)
  };

  useEffect(() => {
    if (!activityRoom || state.type !== "room-initialised" || !connectedToClient) return;
    activityRoom.onStateChange(setState);
  }, [setState, state.type, connectedToClient]);

  return { connectToClient };
};

export const useColyseus = () => {
  const sendMessage = useCallback(
    (message: ClientToServerMessageUnion) => activityRoom?.sendMessage(message),
    []
  );

  return { sendMessage };
};
