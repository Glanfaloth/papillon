import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { GlobalState, JoinOptions } from "@papillon/helpers/lib/types";

const NUMBER_USERS = 3;
export class MyRoom extends Room<MyRoomState> {
  onCreate(options: JoinOptions) {
    this.setState(
      new MyRoomState({
        byUser: { [options.username]: {} },
        step: { type: "waiting", properties: undefined },
      })
    );

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onJoin(client: Client, options: JoinOptions): void {
    const state = this.state.getState();

    if (state) {
      const newGlobalState = {
        step: state.step,
        byUser: { ...state.byUser, [options.username]: {} },
      };

      if (Object.keys(newGlobalState.byUser).length >= NUMBER_USERS) {
        newGlobalState.step = {
          type: "question",
          // TODO(michael)
          properties: { questionData: {} },
        };
      }

      this.setState(new MyRoomState(newGlobalState));
    } else {
      this.onCreate(options);
    }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    const state = this.state.getState();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
