import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType, DescriptionType } from "../../types";
import { ChangeNameType, InitialCardState } from "./types";

const initialState: InitialCardState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard(state, { payload }: PayloadAction<CardType>) {
      state.cards.push(payload);
    },
    removeCard(state, { payload }: PayloadAction<number>) {
      state.cards = state.cards.filter((card) => card.id !== payload);
    },
    changeNameCard(state, { payload }: PayloadAction<ChangeNameType>) {
      const card = state.cards.find((card) => card.id === payload.id);
      if (card) {
        card.name = payload.name;
      }
    },
    changeDescription(state, { payload }: PayloadAction<DescriptionType>) {
      const card = state.cards.find((card) => card.id === payload.cardId);
      if (card) {
        card.description = payload.text;
      }
    },
    removeDescription(state, { payload }: PayloadAction<number>) {
      const card = state.cards.find((card) => card.id === payload);
      if (card) {
        card.description = "";
      }
    },
  },
});

export const {
  addCard,
  removeCard,
  changeNameCard,
  changeDescription,
  removeDescription,
} = cardSlice.actions;
export default cardSlice.reducer;
