import React, { useState } from "react";
import styled from "styled-components";
import { CommentType } from "../../../types";
import TextAreaField from "../TextAreaField/TextAreaField";

type CommentProps = {
  comment: CommentType;
  changeComment: (text: string, id: number) => void;
  removeComment: (id: number) => void;
};

const CommentField: React.FC<CommentProps> = ({
  comment,
  changeComment,
  removeComment,
}) => {
  const [isVisibleChangeComment, setIsVisibleChangeComment] = useState(false);
  const change = (text: string, id: number) => {
    changeComment(text, id);
    setIsVisibleChangeComment(false);
  };

  return (
    <Comment>
      {isVisibleChangeComment ? (
        <TextAreaField
          id={comment.id}
          placeName={comment.text}
          btnName="Сохранить"
          change={change}
          close={() => setIsVisibleChangeComment(false)}
        />
      ) : (
        <>
          <CommentWrapper>
            <p>{comment.text}</p>
          </CommentWrapper>
          <button onClick={() => setIsVisibleChangeComment(true)}>
            Изменить
          </button>
          <button onClick={() => removeComment(comment.id)}>Удалить</button>
        </>
      )}
    </Comment>
  );
};

export default CommentField;

const Comment = styled.div`
  width: 60%;
`;
const CommentWrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  padding-left: 10px;
  margin-bottom: 10px;
`;
