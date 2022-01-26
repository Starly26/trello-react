import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";

const authorSlice = createSlice({
  name: "author",
  initialState,
  reducers: {
    addAuthorName(state, { payload }: PayloadAction<string>) {
      return payload;
    },
  },
});

export const { addAuthorName } = authorSlice.actions;
export default authorSlice.reducer;
