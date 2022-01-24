import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType } from "../../types";
import { ChangeNameType, InitialCommentState } from "./types";

const initialState: InitialCommentState = {
  comments: [],
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, { payload }: PayloadAction<CommentType>) {
      state.comments.push(payload);
    },
    removeComment(state, { payload }: PayloadAction<number>) {
      state.comments = state.comments.filter(
        (comment) => comment.id !== payload
      );
    },
    changeComment(state, { payload }: PayloadAction<ChangeNameType>) {
      const comment = state.comments.find(
        (comment) => comment.id === payload.id
      );
      if (comment) {
        comment.text = payload.text;
      }
    },
  },
});

export const { addComment, removeComment, changeComment } =
  commentSlice.actions;
export default commentSlice.reducer;
