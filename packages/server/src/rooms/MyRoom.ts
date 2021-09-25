import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { JoinOptions } from '@papillon/helpers/lib/types';

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

  }

  onJoin (client: Client, options: JoinOptions): void {
    console.log(client.sessionId, "joined!", options);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
