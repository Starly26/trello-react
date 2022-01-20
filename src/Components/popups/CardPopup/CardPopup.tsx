import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CardType, CommentType } from "../../../types";
import { ChangeNameField } from "../../ui/ChangeNameField";
import { CommentField } from "../../ui/CommentField";
import { TextAreaField } from "../../ui/TextAreaField";

type CardPopupProps = {
  name: string;
  columnName: string;
  close: any;
  userName: string;
  changeName: (name: string, cardId: number) => void;
  card: CardType;
  visible: (value: boolean) => void;
  changeDescription: (text: string, cardId: number) => void;
  addComment: (text: string, cardId: number) => void;
  comments: CommentType[];
  changeComment: (text: string, id: number) => void;
  removeComment: (id: number) => void;
  removeDescription: (id: number) => void;
};

const CardPopup: React.FC<CardPopupProps> = ({
  name,
  close,
  columnName,
  userName,
  card,
  visible,
  changeDescription,
  comments,
  addComment,
  changeComment,
  changeName,
  removeComment,
  removeDescription,
}) => {
  const [isVisibleDesc, setIsVisibleDesc] = useState(false);

  const closeDescription = (text: string, cardId: number) => {
    changeDescription(text, cardId);
    setIsVisibleDesc(false);
  };

  useEffect(() => {
    const escListen = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        visible(false);
      }
    };
    document.addEventListener("keydown", escListen);

    return () => document.removeEventListener("keydown", escListen);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Wrapper1>
          <ChangeNameField name={name} setName={changeName} id={card.id} />
          <ImgWrapper onClick={close}>
            <img src="/assets/close.svg" alt="" />
          </ImgWrapper>
        </Wrapper1>
        <p>в колонке {columnName}</p>
        <h3>Описание</h3>
        {isVisibleDesc ? (
          <AreaWrapper>
            <TextAreaField
              id={card.id}
              placeName="Добавить более подробное описание"
              btnName="Сохранить"
              close={() => setIsVisibleDesc(false)}
              change={closeDescription}
            />
          </AreaWrapper>
        ) : (
          <div>
            <p>{card.description}</p>
            <button onClick={() => setIsVisibleDesc(true)}>Изменить</button>
            <button onClick={() => removeDescription(card.id)}>Удалить</button>
          </div>
        )}
        <p>Автор {userName}</p>
        <AreaWrapper>
          <TextAreaField
            id={card.id}
            placeName="Напишите комментарий"
            btnName="Сохранить"
            change={addComment}
          />
        </AreaWrapper>
        {comments.map((comment) => {
          if (comment.cardId === card.id) {
            return (
              <div key={comment.id}>
                <p>{userName}</p>
                <CommentField
                  comment={comment}
                  changeComment={changeComment}
                  removeComment={removeComment}
                />
              </div>
            );
          }
          return <></>;
        })}
      </Wrapper>
    </Container>
  );
};

export default CardPopup;

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000000a3;
`;
const Wrapper = styled.div`
  width: 90%;
  background-color: white;
  margin: 40px auto;
  height: 90%;
  padding: 20px;
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImgWrapper = styled.div`
  width: 15px;
  cursor: pointer;
`;

const AreaWrapper = styled.div`
  width: 60%;
`;
