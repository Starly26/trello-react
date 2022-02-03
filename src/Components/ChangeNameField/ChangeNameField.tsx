import React, { useState } from "react";
import { Field, Form, FormProps } from "react-final-form";

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

  const onSubmit = (values: FormProps<{ name: string }>) => {
    handleName(values.name, id);
    setIsVisible(false);
  };
  return (
    <div>
      {isVisible ? (
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, values, form }) => (
            <form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <Field
              name="Email"
              component="input"
              type="text"
              placeholder="Email"
            />
          </div>
          <div>
            <label>Last Name</label>
            <Field
              name="Password"
              component="input"
              type='password'
              placeholder="Password"
            />
          </div>
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
