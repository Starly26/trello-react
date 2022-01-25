import React from "react";
import { Field, Form, FormProps } from "react-final-form";
import styled from "styled-components";
import { addAuthorName } from "../../../store/author/authorSlice";
import { useAppDispatch} from "../../../store/hooks";
import { MyInput } from "../../ui/MyInput";

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
                component={MyInput}
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
