import React, { useState } from "react";
import styled from "styled-components";
import { CardType, CommentType } from "../../../../types";
import { CardPopup } from "../../../popups/CardPopup";

type CardProps = {
  card: CardType;
  columnName: string;
  userName: string;
  changeDescription: (text: string, cardId: number) => void;
  addComment: (text: string, cardId: number) => void;
  comments: CommentType[];
  changeComment: (text: string, id: number) => void;
  changeNameCard: (name: string, cardId: number) => void;
  removeCard: (id: number) => void;
  removeComment: (id: number) => void;
  removeDescription: (id: number) => void;
};
const Card: React.FC<CardProps> = ({
  card,
  columnName,
  userName,
  changeDescription,
  addComment,
  comments,
  changeComment,
  changeNameCard,
  removeCard,
  removeComment,
  removeDescription,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  let countComments = 0;
  comments.map((comment) => {
    if (comment.cardId === card.id) {
      countComments++;
    } 
    return countComments
  });

  return (
    <>
      {isPopupVisible ? (
        <CardPopup
          visible={setIsPopupVisible}
          userName={userName}
          name={card.name}
          close={() => setIsPopupVisible(false)}
          columnName={columnName}
          changeName={changeNameCard}
          card={card}
          changeDescription={changeDescription}
          comments={comments}
          addComment={addComment}
          changeComment={changeComment}
          removeComment={removeComment}
          removeDescription={removeDescription}
        />
      ) : (
        <Wrapper onClick={() => setIsPopupVisible(true)}>
          <Container>
            <p>{card.name}</p>
            <ImgContainer onClick={() => removeCard(card.id)}>
              <Img src="/assets/delete.svg" />
            </ImgContainer>
          </Container>
          <Container2>
            <ImgContainer>
              <Img src="/assets/comment.svg" />
            </ImgContainer>
            <p>{countComments}</p>
          </Container2>
        </Wrapper>
      )}
    </>
  );
};

export default Card;

const Wrapper = styled.div`
  width: 80%;
  background-color: white;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container2 = styled.div`
  display: flex;
  align-items: center;
`;
const ImgContainer = styled.div`
  width: 15px;
  height: 15px;
  margin: 0 5px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
