import { useCallback, useEffect, useState } from "react";
import {
  JoinOptions,
  ClientToServerMessageUnion,
  RawState,
  GlobalStateClient,
} from "@papillon/helpers/lib/types";
import _ from "lodash";
import { activityRoom } from "./activity-room";

export const useColyseus = () => {
  const [isConnected, setIsConnected] = useState(!!activityRoom?.room);
  const [isConnecting, setIsConnecting] = useState(false);

  const [state, setState] = useState<GlobalStateClient>();

  const connectToClient = async (options: JoinOptions) => {
    try {
      setIsConnecting(true);
      await activityRoom?.connect(options);
      setIsConnected(true);
    } finally {
      setIsConnecting(false);
    }
  };

  const sendMessage = useCallback(
    (message: ClientToServerMessageUnion) => activityRoom?.sendMessage(message),
    []
  );

  const stateUpdate = (newState: GlobalStateClient) => {
    if (!_.isEqual(newState, state)) {
      setState(newState);
    }
  };

  useEffect(() => {
    if (!isConnected) return;

    activityRoom?.onStateChange(stateUpdate);

    return () => activityRoom?.removeAllListeners();
  }, [stateUpdate, isConnected]);

  return { connectToClient, sendMessage, state };
};
