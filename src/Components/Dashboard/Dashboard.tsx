import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LocalStorageService from "../../services/LocalStorageService";
import { CardType, ColumnType, CommentType } from "../../types";
import { NamedPopup } from "../popups/NamedPopup";
import { Column } from "./Column";

const Dashboard: React.FC = () => {
  const [name, setName] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    const savedName = LocalStorageService.getAuthorName();
    if (savedName) {
      setIsPopupVisible(false);
      setName(savedName);
    }
  }, []);

  const [columns, setColumns] = useState<ColumnType[]>([
    { id: 1, name: "TODO" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Testing" },
    { id: 4, name: "Done" },
  ]);

  const [cards, setCards] = useState<CardType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const savedCards = LocalStorageService.getCards();
    const savedComments = LocalStorageService.getComments();
    console.log(savedCards);
    console.log(savedComments);
    
    setCards(savedCards);
    setComments(savedComments);
  }, []);

  useEffect(() => {
    LocalStorageService.setCards([...cards]);
  }, [cards])

  useEffect(() => {
    LocalStorageService.setComments([...comments])
  }, [comments])

  const addCard = (name: string, columnId: number) => {
    const card: CardType = {
      columnId,
      id: Date.now(),
      name,
      description: "",
      commentsIds: [],
    };
    setCards([...cards, card]);
  };

  const changeDescription = (description: string, cardId: number) => {
    const arr = cards.map((item) => {
      if (item.id === cardId) {
        return { ...item, description };
      } else return item;
    });
    setCards([...arr]);
  };

  const removeDescription = (cardId: number) => {
    const arr = cards.map((item) => {
      if (item.id === cardId) {
        return { ...item, description: "" };
      } else return item;
    });
    setCards([...arr]);
  };

  const addComment = (text: string, cardId: number) => {
    const item: CommentType = { id: Date.now(), cardId, text };
    setComments([...comments, item]);
  };

  const changeComment = (text: string, commentId: number) => {
    const arr = comments.map((item) => {
      if (item.id === commentId) {
        return { ...item, text };
      } else return item;
    });
    setComments([...arr]);
  };

  const changeNameCard = (name: string, cardId: number) => {
    const arr = cards.map((item) => {
      if (item.id === cardId) {
        return { ...item, name };
      } else return item;
    });
    setCards([...arr]);
  };

  const removeCard = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const removeComment = (id: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <>
      {isPopupVisible ? (
        <NamedPopup
          name={name}
          setName={setName}
          saveName={() => setIsPopupVisible(false)}
        />
      ) : (
        <Container>
          {columns.map((column) => (
            <Column
              removeDescription={removeDescription}
              removeComment={removeComment}
              removeCard={removeCard}
              changeNameCard={changeNameCard}
              changeComment={changeComment}
              comments={comments}
              addComment={addComment}
              changeDescription={changeDescription}
              userName={name}
              cards={cards}
              column={column}
              key={column.id}
              addCard={addCard}
            />
          ))}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;

  padding: 10px;
  justify-content: space-between;
`;

export default Dashboard;
