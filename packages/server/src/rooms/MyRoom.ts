import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import {
  ChooseWordMessage,
  JoinOptions,
  SubmitDescriptionMessage,
  UserState,
} from "@papillon/helpers/lib/types";
import { writeDescriptionQuestions } from "../data";
import { QUESTION_DURATION_SECONDS } from "@papillon/helpers/lib/const";

const NUMBER_USERS = 2;

export class MyRoom extends Room<MyRoomState> {
  onCreate(options: JoinOptions) {
    this.setState(
      new MyRoomState({
        byUser: { [options.username]: { score: 0, seenWords: [] } },
        step: { type: "waiting", properties: undefined },
      })
    );

    this.onMessage(
      "submit-description",
      (client, message: SubmitDescriptionMessage["properties"]) => {
        const state = this.state.getState();
        const userState = state.byUser[message.username] ?? {
          score: 0,
          seenWords: [],
        };

        userState.score = message.score + userState.score;
        userState.seenWords.push({
          word: message.word,
          description: message.description,
          isAuthor: true,
        });

        this.setState(
          new MyRoomState({
            step: state.step,
            byUser: { ...state.byUser, [message.username]: userState },
          })
        );
      }
    );

    this.onMessage(
      "choose-word",
      (client, message: ChooseWordMessage["properties"]) => {
        const state = this.state.getState();
        const userState = state.byUser[message.username] ?? {
          score: 0,
          seenWords: [],
        };

        userState.score = message.score + userState.score;
        userState.seenWords.push({
          word: message.word,
          description: message.description,
          isAuthor: false,
        });

        const authorState = state.byUser[message.authorUsername] ?? {
          score: 0,
          seenWords: [],
        };
        authorState.score = message.authorScore + authorState.score;

        this.setState(
          new MyRoomState({
            step: state.step,
            byUser: {
              ...state.byUser,
              [message.username]: userState,
              [message.authorUsername]: authorState,
            },
          })
        );
      }
    );
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
          remainingTime: QUESTION_DURATION_SECONDS,
          properties: {
            userToQuestionData: Object.fromEntries(
              Object.keys(newGlobalState.byUser).map((userId, index) => [
                userId,
                writeDescriptionQuestions[index],
              ])
            ),
          },
        };

        this.setState(new MyRoomState(newGlobalState));

        this.clock.start();

        const interval = this.clock.setInterval(() => {
          const state = this.state.getState();
          if (state.step.type === "write-description") {
            state.step.remainingTime = Math.max(
              0,
              state.step.remainingTime - 0.1
            );
          }

          this.setState(new MyRoomState(state));
        }, 100);

        this.clock.setTimeout(() => {
          interval.clear();

          const newGlobalState2 = this.state.getState();

          const wordsSuggestedToOtherUsers: string[] = [];

          newGlobalState2.step = {
            type: "choose-word",
            remainingTime: QUESTION_DURATION_SECONDS,
            properties: {
              userToWordAndDescription: Object.fromEntries(
                Object.keys(newGlobalState2.byUser).map((userId) => {
                  const mySeenWords = newGlobalState2.byUser[
                    userId
                  ].seenWords.map(({ word }) => word);

                  const allWordsFlattened = Object.entries(
                    newGlobalState2.byUser
                  ).flatMap(([otherUserId, { seenWords: otherSeenWords }]) =>
                    otherSeenWords.map(({ word, description }) => ({
                      otherUserId,
                      word,
                      description,
                    }))
                  );

                  // word has not been done by user1
                  // word has been done by user 2
                  const nextQuestion =
                    allWordsFlattened.find(
                      ({ word }) =>
                        !mySeenWords.includes(word) &&
                        !wordsSuggestedToOtherUsers.includes(word)
                    ) ??
                    allWordsFlattened.find(
                      ({ word }) => !mySeenWords.includes(word)
                    );

                  const nextQuestionData = writeDescriptionQuestions.find(
                    (question) => question.word === nextQuestion.word
                  );

                  if (!nextQuestion || !nextQuestionData)
                    throw new Error("no question found");

                  wordsSuggestedToOtherUsers.push(nextQuestion.word);

                  return [
                    userId,
                    {
                      word: nextQuestion.word,
                      authorUsername: nextQuestion.otherUserId,
                      similarWords: nextQuestionData.similarWords,
                      userDescription: nextQuestion.description,
                    },
                  ];
                })
              ),
            },
          };

          this.setState(new MyRoomState(newGlobalState2));

          const interval2 = this.clock.setInterval(() => {
            const state = this.state.getState();
            if (state.step.type === "choose-word") {
              state.step.remainingTime = Math.max(
                0,
                state.step.remainingTime - 0.1
              );
              this.setState(new MyRoomState(state));
            }
          }, 100);

          this.clock.setTimeout(() => {
            interval2.clear();

            const state = this.state.getState();
            state.step = {
              type: "end-screen",
              properties: undefined,
            };

            this.setState(new MyRoomState(state));
          }, 20_000);
        }, 20_000);
      }
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
