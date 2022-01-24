import { CardType, CommentType } from "../types";

class LocalStorageService {
  getCards(): CardType[] {
    return JSON.parse(localStorage.getItem("cards") || "[]");
  }

  getComments(): CommentType[] {
    return JSON.parse(localStorage.getItem("comments") || "[]");
  }

  setCards(cards: CardType[]) {
    return localStorage.setItem("cards", JSON.stringify(cards));
  }

  setComments(comments:CommentType[]) {
    return localStorage.setItem("comments", JSON.stringify(comments))
  }

  getAuthorName() {
    return localStorage.getItem("authorName")
  }

  setAuthorName(name:string) {
    return localStorage.setItem("authorName", name)
  }
}

export default new LocalStorageService();
