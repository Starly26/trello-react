import React from 'react';
import styled from 'styled-components';
import { TextAreaFieldProps } from '../../../types';

const MyTextArea:React.FC <TextAreaFieldProps> = (props) => {
  return <TextArea {...props.input}/>
};

export default MyTextArea;

const TextArea = styled.textarea`
  width:90%;
`