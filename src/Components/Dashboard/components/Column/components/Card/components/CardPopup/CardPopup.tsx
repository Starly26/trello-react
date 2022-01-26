import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../../../../../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../../../../../../hooks/useAppSelect";
import {
  changeDescription,
  changeNameCard,
  removeDescription,
} from "../../../../../../../../store/slices/card/cardSlice";
import { addComment } from "../../../../../../../../store/slices/comment/commentSlice";
import { CardType, CommentType } from "../../../../../../../../types";
import { ChangeNameField } from "../../../../../../../ChangeNameField";
import { CommentField } from "../CommentField";
import { TextAreaField } from "../../../../../../../TextAreaField";
import { Modal } from "../../../../../../../popups/Modal";


type CardPopupProps = {
  columnName: string;
  close: () => void;
  card: CardType;
  visible: (value: boolean) => void;
};

const CardPopup: React.FC<CardPopupProps> = ({
  close,
  columnName,
  card,
  visible,
}) => {
  const userName = useAppSelector((state) => state.author);
  const comments = useAppSelector((state) => state.comment.comments);

  const [isVisibleDesc, setIsVisibleDesc] = useState(false);
  const dispatch = useAppDispatch();

  const onCloseDescription = (text: string, cardId: number) => {
    const newDescription = { text, cardId };
    dispatch(changeDescription(newDescription));
    setIsVisibleDesc(false);
  };

  const onChangeName = (name: string, id: number) => {
    const newCardName = { name, id };
    dispatch(changeNameCard(newCardName));
  };

  const addNewComment = (text: string, cardId: number) => {
    const comment: CommentType = { id: Date.now(), cardId, text };
    dispatch(addComment(comment));
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
    <Modal>
      <Wrapper>
        <WrapperNameField>
          <ChangeNameField
            name={card.name}
            handleName={onChangeName}
            id={card.id}
          />
          <ImgWrapper onClick={close}>
            <img src="/assets/close.svg" alt="" />
          </ImgWrapper>
        </WrapperNameField>
        <p>в колонке {columnName}</p>
        <h3>Описание</h3>
        {isVisibleDesc ? (
          <AreaWrapper>
            <TextAreaField
              id={card.id}
              placeName="Добавить более подробное описание"
              btnName="Сохранить"
              onClose={() => setIsVisibleDesc(false)}
              onChange={onCloseDescription}
            />
          </AreaWrapper>
        ) : (
          <div>
            <p>{card.description}</p>
            <button onClick={() => setIsVisibleDesc(true)}>Изменить</button>
            <button onClick={() => dispatch(removeDescription(card.id))}>
              Удалить
            </button>
          </div>
        )}
        <p>Автор {userName}</p>
        <AreaWrapper>
          <TextAreaField
            id={card.id}
            placeName="Напишите комментарий"
            btnName="Сохранить"
            onChange={addNewComment}
          />
        </AreaWrapper>
        {comments.map((comment) => {
          if (comment.cardId === card.id) {
            return (
              <div key={comment.id}>
                <p>{userName}</p>
                <CommentField comment={comment} />
              </div>
            );
          }
          return <></>;
        })}
      </Wrapper>
    </Modal>
  );
};

export default CardPopup;

const Wrapper = styled.div`
  width: 90%;
  background-color: white;
  margin: 40px auto;
  height: 90%;
  padding: 20px;
`;

const WrapperNameField = styled.div`
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
