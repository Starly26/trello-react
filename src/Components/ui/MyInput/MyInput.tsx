import React from 'react';
import styled from 'styled-components';
import { InputFieldProps } from '../../../types';

const MyInput:React.FC <InputFieldProps> = (props) => {
  return <Input {...props.input} />
};

export default MyInput;

const Input = styled.input`
  width:90%;
  margin-left:2%;
`