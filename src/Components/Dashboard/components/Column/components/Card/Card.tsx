import React, { useState } from "react";
import styled from "styled-components";
import { removeCard } from "../../../../../../store/card/cardSlice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { CardType } from "../../../../../../types";
import { CardPopup } from "../../../../../popups/CardPopup";

type CardProps = {
  card: CardType;
  columnName: string;
};
const Card: React.FC<CardProps> = ({ card, columnName }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const dispath = useAppDispatch();
  const comments = useAppSelector((state) => state.comment.comments);

  let countComments = 0;
  comments.map((comment) => {
    if (comment.cardId === card.id) {
      countComments++;
    }
    return countComments;
  });

  return (
    <>
      {isPopupVisible ? (
        <CardPopup
          visible={setIsPopupVisible}
          close={() => setIsPopupVisible(false)}
          columnName={columnName}
          card={card}
        />
      ) : (
        <Wrapper onClick={() => setIsPopupVisible(true)}>
          <Container>
            <p>{card.name}</p>
            <ImgContainer onClick={() => dispath(removeCard(card.id))}>
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
