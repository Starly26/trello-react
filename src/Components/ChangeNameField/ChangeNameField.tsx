import React, { useState } from "react";
import { Field, Form, FormProps } from "react-final-form";
import { MyInput } from "../ui/MyInput";

type ChangeNameProps = {
  name: string;
  handleName: (value: string, id: number) => void;
  id: number;
};

const ChangeNameField: React.FC<ChangeNameProps> = ({
  name,
  handleName,
  id,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (values: FormProps<{ name: string }>) => {
    handleName(values.name, id);
    setIsVisible(false);
  };
  return (
    <div>
      {isVisible ? (
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                component={MyInput}
                type="text"
                defaultValue={name}
                onBlur={() => handleSubmit()}
                autoFocus={true}
              />
            </form>
          )}
        />
      ) : (
        <h3 onClick={() => setIsVisible(true)}>{name}</h3>
      )}
    </div>
  );
};

export default ChangeNameField;
