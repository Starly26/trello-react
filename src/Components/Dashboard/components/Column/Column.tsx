import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { addCard } from "../../../../store/card/cardSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { CardType, ColumnType} from "../../../../types";
import { ChangeNameField } from "../../../ChangeNameField";
import { TextAreaField } from "../../../TextAreaField";

import { Card } from "./components/Card";

type ColumnProps = {
  column: ColumnType;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  const cards = useAppSelector((state) => state.cards.cards);
  const dispath = useAppDispatch();

  const [columnName, setColumnName] = useState(column.name);
  const [isVisibleTextArea, setIsVisibleTextArea] = useState(false);

  const addNewCard = (name: string, columnId: number) => {
    const card: CardType = {
      columnId,
      id: Date.now(),
      name,
      description: "",
      commentsIds: [],
    };
    dispath(addCard(card));
  };

  const card = useMemo(() => {
    return cards.filter((card) => card.columnId === column.id);
  }, [cards, column.id]);

  return (
    <ColumnContainer>
      <ColumnWrapper>
        <ChangeNameField
          name={columnName}
          handleName={setColumnName}
          id={column.id}
        />
      </ColumnWrapper>
      <ColumnWrapper>
        {card.map((item) => {
          return <Card card={item} key={item.id} columnName={columnName} />;
        })}

        {isVisibleTextArea ? (
          <TextAreaContainer>
            <TextAreaField
              id={column.id}
              onChange={addNewCard}
              onClose={() => setIsVisibleTextArea(false)}
              placeName="Ввести заголовок этой карточки"
              btnName="Add card"
            />
          </TextAreaContainer>
        ) : (
          <Button onClick={() => setIsVisibleTextArea(true)}>Add card</Button>
        )}
      </ColumnWrapper>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 200px;
  margin: 30px;
`;
const ColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 10px;
`;
const Button = styled.button`
  padding: 5px;
  cursor: pointer;
`;

const TextAreaContainer = styled.div`
  width: 80%;
  margin-left: auto;
`;

export default Column;
