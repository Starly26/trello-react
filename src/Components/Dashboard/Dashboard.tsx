import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LocalStorageService from "../../services/LocalStorageService";
import { ColumnType } from "../../types";
import { NamedPopup } from "../popups/NamedPopup";
import { Column } from "./components/Column";
import { useAppDispatch } from "../../store/hooks";
import { addAuthorName } from "../../store/author/authorSlice";

const Dashboard: React.FC = () => {
  const dispath = useAppDispatch();

  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    const savedName = LocalStorageService.getAuthorName();
    if (savedName) {
      setIsPopupVisible(false);
      dispath(addAuthorName(savedName));
    }
  }, []);

  const [columns, setColumns] = useState<ColumnType[]>([
    { id: 1, name: "TODO" },
    { id: 2, name: "In Progress" },
    { id: 3, name: "Testing" },
    { id: 4, name: "Done" },
  ]);

  // useEffect(() => {
  //   const savedCards = LocalStorageService.getCards();
  //   const savedComments = LocalStorageService.getComments();
  //   savedCards.map((card) => {
  //     dispath(addCard(card));
  //   })
  //   setComments(savedComments);
  // }, []);

  // useEffect(() => {
  //   LocalStorageService.setCards([...cards]);
  // }, [cards])

  // useEffect(() => {
  //   LocalStorageService.setComments([...comments])
  // }, [comments])

  return (
    <>
      {isPopupVisible ? (
        <NamedPopup saveName={() => setIsPopupVisible(false)} />
      ) : (
        <Container>
          {columns.map((column) => (
            <Column column={column} key={column.id} />
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
