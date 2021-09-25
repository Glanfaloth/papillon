import { StateForUser, GlobalState } from "@papillon/helpers/lib/types";
import jwt from "jsonwebtoken";
import _ from 'lodash';

export const getGlobalState = (rawState: string): GlobalState => {
  const decoded = jwt.decode(rawState);
  console.log({ decoded })

  if (typeof decoded === "string" || !decoded)
    throw new Error("could not decode");

  return decoded as GlobalState;
};

export const getRawState = (state: GlobalState): string =>
  jwt.sign(_.pick(state, ['byUser', 'step']), "test");
