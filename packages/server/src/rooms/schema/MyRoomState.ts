import { Schema, Context, type } from "@colyseus/schema";
import { GlobalState, RawState } from "@papillon/helpers/lib/types";
import { getGlobalState, getRawState } from "../utils";

const defaultState: GlobalState = {
  step: { type: "waiting", properties: undefined },
  byUser: {},
};
export class MyRoomState extends Schema implements RawState {
  @type("string") state: string;

  constructor(state?: GlobalState) {
    super();
    this.state = getRawState(state ?? defaultState);
  }

  getState = (): GlobalState => getGlobalState(this.state);
}
