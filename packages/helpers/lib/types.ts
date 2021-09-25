export type JoinOptions = {
  username: string;
};

export type ClientToServerMessageUnion = {
  type: "question-answer";
  properties: {};
};

export type QuestionData = {
  word: string;
  similarWords: [];
};

export type Step =
  | { type: "waiting"; properties: undefined }
  | {
      type: "question";
      properties: {
        // TODO(michael)
        questionData: {};
      };
    }
  | { type: "question-time-elapsed" };

export type UserState = {};

export type GlobalState = {
  byUser: {
    [username: string]: UserState;
  };
  step: Step;
};

export type StateForUser = {
  userState?: UserState;
  step: Step;
};

export interface RawState {
  state: string;
}

export const questions: QuestionData[] = [];
