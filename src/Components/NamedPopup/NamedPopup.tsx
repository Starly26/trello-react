import React from "react";
import { Field, Form, FormProps } from "react-final-form";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { addAuthorName } from "../../store/slices/author/authorSlice";
import { Modal } from "../popups/Modal";



type PopupProps = {
  saveName: () => void;
};

const NamedPopup: React.FC<PopupProps> = ({ saveName }) => {
  const dispath = useAppDispatch()

  const save = (values: FormProps<{ name: string }>) => {
    saveName();
    dispath(addAuthorName((values.name)))
  };

  return (
    <Modal>
      <Container>
        <Form
          onSubmit={save}
          render={({ handleSubmit, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                component='input'
                type="text"
                placeholder="Введите Ваше имя"
              />
              <Button type="submit" disabled={submitting || pristine}>
                Продолжить
              </Button>
            </form>
          )}
        />
      </Container>
    </Modal>
  );
};

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
