import { CommentType } from "../../types";

export type InitialCommentState = {
  comments: CommentType[];
};

export type ChangeNameType = {
  text: string;
  id: number;
};
