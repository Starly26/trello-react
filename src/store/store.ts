import { configureStore } from "@reduxjs/toolkit";
import cardReduser from "./card/cardSlice";
import commentReduser from "./comment/commentSlice";
import authorReduser from "./author/authorSlice";

const store = configureStore({
  reducer: {
    cards: cardReduser,
    comment: commentReduser,
    author: authorReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
