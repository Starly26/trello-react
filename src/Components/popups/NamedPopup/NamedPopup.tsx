import React from "react";
import styled from "styled-components";

type PopupProps = {
  saveName: () => void;
  name: string;
  setName: (value: string) => void;
};

const NamedPopup: React.FC<PopupProps> = ({ name, saveName, setName }) => {
  const save = () => {
    localStorage.setItem("authorName", name);
    setName(name);
    saveName();
  };

  return (
    <Modal>
      <Container>
        <input
          value={name}
          onChange={(evt) => setName(evt.target.value)}
          placeholder="Введите Ваше имя"
        />
        <Button disabled={!name.length} onClick={save}>
          Продолжить
        </Button>
      </Container>
    </Modal>
  );
};

const Modal = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: center;
  border-radius: 20px;
  background-color: #fff;
  padding: 40px;
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 5px;
`;

export default NamedPopup;
