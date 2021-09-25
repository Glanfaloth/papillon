import { StateForUser, GlobalState } from "@papillon/helpers/lib/types";
import jwt from "jsonwebtoken";

export const getGlobalState = (rawState: string): GlobalState => {
  const decoded = jwt.decode(rawState);

  if (typeof decoded === "string") throw new Error("could not decode");

  return decoded.payload as GlobalState;
};

export const getUserStateFromRawState = (
  rawState: string,
  username: string
): StateForUser => {
  const globalState = getGlobalState(rawState);

  return {
    step: globalState.step,
    userState: globalState.byUser[username],
  };
};

export const getRawState = (state: GlobalState): string =>
  jwt.sign(state, "test");
