export type JoinOptions = {
  username: string;
  roomId: string;
};

export type SubmitDescriptionMessage = {
  type: "submit-description";
  properties: {
    username: string;
    word: string;
    description: string;
    score: number;
  };
};

export type ChooseWordMessage = {
  type: "choose-word";
  properties: {
    username: string;
    score: number;
    authorUsername: string;
    authorScore: number;
    word: string;
    description: string;
  };
};

export type ClientToServerMessageUnion =
  | SubmitDescriptionMessage
  | ChooseWordMessage;

export type WriteDescriptionData = {
  word: string;
  similarWords: string[];
  confusingWords: string[];
  englishSynonyms: string[]
};

export type ChooseWordData = {
  word: string;
  authorUsername: string;
  similarWords: string[];
  confusingWords: string[];
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
  | { type: "end-screen"; properties: undefined };

export type DescriptionSubmission = {
  word: string;
  description: string;
  isAuthor: boolean;
};

export type UserState = { score: number; seenWords: DescriptionSubmission[] };

export type GlobalState = {
  byUser: {
    [username: string]: UserState;
  };
  step: Step;
};

export type GlobalStateClient = GlobalState & { username: string };

export type GlobalStateClientFrontend =
  | (GlobalStateClient & { type: "connected" })
  | { type: "loading" }
  | { type: "room-initialised" };

export interface RawState {
  state: string;
}

export const questions: WriteDescriptionData[] = [];
