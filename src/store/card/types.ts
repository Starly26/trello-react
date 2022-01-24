import { CardType } from "../../types";

export type InitialCardState = {
  cards: CardType[];
};

export type ChangeNameType = {
  name: string;
  id: number;
};
