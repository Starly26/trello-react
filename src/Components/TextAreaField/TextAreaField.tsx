import React from "react";
import { Field, Form, FormProps } from "react-final-form";
import styled from "styled-components";
import { MyTextArea } from "../ui/MyTextArea";

type TextAreaProps = {
  placeName: string;
  btnName: string;
  onClose?: () => void;
  onChange: (val: string, id: number) => void;
  id: number;
};

const TextAreaField: React.FC<TextAreaProps> = ({
  placeName,
  btnName,
  onClose,
  onChange,
  id,
}) => {
  const handleSubmit = (values: FormProps<{ name: string }>) => {
    onChange(values.name, id);
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="name"
              component={MyTextArea}
              placeholder={placeName}
            />
            <Div>
              <Button type="submit" disabled={submitting || pristine}>
                {btnName}
              </Button>
              {onClose ? (
                <ImgContainer onClick={onClose}>
                  <img src="/assets/close.svg" alt="close" />
                </ImgContainer>
              ) : (
                <></>
              )}
            </Div>
          </form>
        )}
      />
    </div>
  );
};

export default TextAreaField;

const ImgContainer = styled.div`
  width: 15px;
`;
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  padding: 5px;
`;
const Textarea = styled.textarea`
  width: 100%;
`;
