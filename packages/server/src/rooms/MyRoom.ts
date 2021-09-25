import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import {
  GlobalState,
  JoinOptions,
  UserState,
} from "@papillon/helpers/lib/types";
import { writeDescriptionQuestions } from "../data";

const NUMBER_USERS = 3;
export class MyRoom extends Room<MyRoomState> {
  onCreate(options: JoinOptions) {
    this.setState(
      new MyRoomState({
        byUser: { [options.username]: { score: undefined, seenWords: [] } },
        step: { type: "waiting", properties: undefined },
      })
    );

    // this.onMessage("submit-description", (client, message) => {
    //   //
    //   // handle "type" message
    //   //
    // });
  }

  onJoin(client: Client, options: JoinOptions): void {
    const state = this.state.getState();

    if (state) {
      const newGlobalState = {
        step: state.step,
        byUser: {
          ...state.byUser,
          [options.username]: { score: undefined, seenWords: [] } as UserState,
        },
      };

      if (Object.keys(newGlobalState.byUser).length >= NUMBER_USERS) {
        newGlobalState.step = {
          type: "write-description",
          remainingTime: 15,
          properties: {
            userToQuestionData: Object.fromEntries(
              Object.keys(newGlobalState.byUser).map((userId, index) => [
                userId,
                writeDescriptionQuestions[index],
              ])
            ),
          },
        };

        this.clock.start();

        const interval = this.clock.setInterval(() => {
          const state = this.state.getState();
          if (state.step.type === "write-description") {
            state.step.remainingTime = Math.max(
              0,
              state.step.remainingTime - 0.1
            );
          }

          this.setState(new MyRoomState(newGlobalState));
        }, 100);

        this.clock.setTimeout(() => {
          interval.clear();

          const newGlobalState2 = this.state.getState();

          newGlobalState2.step = {
            type: "choose-word",
            remainingTime: 15,
            properties: {
              userToWordAndDescription: Object.fromEntries(
                Object.keys(newGlobalState2.byUser).map((userId) => {
                  const mySeenWords = newGlobalState2.byUser[
                    userId
                  ].seenWords.map(({ word }) => word);

                  // word has not been done by user1
                  // word has been done by user 2
                  const nextQuestion = Object.entries(newGlobalState2.byUser)
                    .flatMap(([otherUserId, { seenWords: otherSeenWords }]) =>
                      otherSeenWords.map(({ word, description }) => ({
                        otherUserId,
                        word,
                        description,
                      }))
                    )
                    .find(({ word }) => !mySeenWords.includes(word));

                  const nextQuestionData = writeDescriptionQuestions.find(
                    (question) => question.word === nextQuestion.word
                  );

                  if (!nextQuestion || !nextQuestionData)
                    throw new Error("no question found");

                  return [
                    userId,
                    {
                      word: nextQuestion.word,
                      similarWords: nextQuestionData.similarWords,
                      userDescription: nextQuestion.description,
                    },
                  ];
                })
              ),
            },
          };

          const interval2 = this.clock.setInterval(() => {
            const state = this.state.getState();
            if (state.step.type === "write-description") {
              state.step.remainingTime = Math.max(
                0,
                state.step.remainingTime - 0.1
              );
            }

            this.setState(new MyRoomState(newGlobalState));
          }, 100);
        }, 20_000);
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
