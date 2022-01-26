import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColumnType } from "../../types";
import { NamedPopup } from "../NamedPopup";
import { Column } from "./components/Column";

import { addAuthorName } from "../../store/slices/author/authorSlice";
import { useAppSelector } from "../../hooks/useAppSelect";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const columns:ColumnType[] = [
  { id: 1, name: "TODO" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Testing" },
  { id: 4, name: "Done" },
];

const Dashboard: React.FC = () => {
  const dispath = useAppDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const savedName = useAppSelector((state) => state.author);

  useEffect(() => {
    if (savedName) {
      setIsPopupVisible(false);
      dispath(addAuthorName(savedName));
    }
  }, []);

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
