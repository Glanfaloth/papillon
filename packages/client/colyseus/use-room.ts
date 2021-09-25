import { useCallback, useEffect, useState } from "react";
import {
  JoinOptions,
  ClientToServerMessageUnion,
  StateForUser,
  RawState,
} from "@papillon/helpers/lib/types";
import _ from "lodash";
import { activityRoom } from "./activity-room";

export const useColyseus = () => {
  const [isConnected, setIsConnected] = useState(!!activityRoom?.room);
  const [isConnecting, setIsConnecting] = useState(false);

  const [state, setState] = useState<StateForUser & { username: string }>();

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

  const stateUpdate = (newState: StateForUser & { username: string }) => {
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
