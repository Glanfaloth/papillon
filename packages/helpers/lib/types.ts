export type JoinOptions = {
  username: string;
};

export type ClientToServerMessageUnion = {
  type: "question-answer";
  properties: {};
};

export type WriteDescriptionData = {
  word: string;
  similarWords: string[];
};

export type ChooseWordData = {
  word: string;
  similarWords: string[];
  userDescription: string;
};

export type Step =
  | { type: "waiting"; properties: undefined }
  | {
      type: "write-description";
      remainingTime: number;
      properties: {
        userToQuestionData: {
          [userId: string]: WriteDescriptionData;
        };
      };
    }
  | {
      type: "choose-word";
      remainingTime: number;
      properties: {
        userToWordAndDescription: {
          [userId: string]: ChooseWordData;
        };
      };
    }
  | { type: "end-screen"; properties: { resultByUser: { score: number } } };

export type DescriptionSubmission = {
  word: string,
  description: string
}

export type UserState = { score?: number, seenWords: DescriptionSubmission[] };

export type GlobalState = {
  byUser: {
    [username: string]: UserState;
  };
  step: Step;
};

export type GlobalStateClient = GlobalState & { username: string };
export interface RawState {
  state: string;
}

export const questions: WriteDescriptionData[] = [];
