export type JoinOptions = {
  username: string;
};

export type ClientToServerMessageUnion = {
  type: "question-answer";
  properties: {};
};

export type ServerToClientMessageUnion =
  | { type: "waiting"; properties: undefined }
  | {
      type: "question";
      properties: {
        questionData: // TODO(michael)
        {};
      };
    }
  | { type: "question-time-elapsed" };
