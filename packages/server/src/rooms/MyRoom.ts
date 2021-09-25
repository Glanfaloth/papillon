import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { GlobalState, JoinOptions } from "@papillon/helpers/lib/types";

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

    console.log({ state })

    if (state) {
      this.setState(
        new MyRoomState({
          step: state.step,
          byUser: { ...state.byUser, [options.username]: {} },
        })
      );
    } else {
      this.onCreate(options);
    }
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
