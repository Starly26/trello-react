import React, { useState } from "react";
import styled from "styled-components";
import { changeComment, removeComment } from "../../../../../../../../store/comment/commentSlice";
import { useAppDispatch } from "../../../../../../../../store/hooks";
import { CommentType } from "../../../../../../../../types";
import { TextAreaField } from "../../../../../../../TextAreaField";


type CommentProps = {
  comment: CommentType;
};

const CommentField: React.FC<CommentProps> = ({
  comment
}) => {
  const [isVisibleChangeComment, setIsVisibleChangeComment] = useState(false);
  const dispatch = useAppDispatch()

  const onChange = (text: string, id: number) => {
    const changedComment = {text, id,}
    dispatch(changeComment(changedComment))
    setIsVisibleChangeComment(false);
  };

  return (
    <Comment>
      {isVisibleChangeComment ? (
        <TextAreaField
          id={comment.id}
          placeName={comment.text}
          btnName="Сохранить"
          onChange={onChange}
          onClose={() => setIsVisibleChangeComment(false)}
        />
      ) : (
        <>
          <CommentWrapper>
            <p>{comment.text}</p>
          </CommentWrapper>
          <button onClick={() => setIsVisibleChangeComment(true)}>
            Изменить
          </button>
          <button onClick={() => dispatch(removeComment(comment.id))}>Удалить</button>
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
