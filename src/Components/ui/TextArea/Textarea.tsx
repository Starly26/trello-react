import React from 'react';
import styled from 'styled-components';
import { TextAreaFieldProps } from '../../../types';

const Textarea:React.FC <TextAreaFieldProps> = (props) => {
  return <StyledTextarea {...props.input}/>
};

export default Textarea;

const StyledTextarea = styled.textarea`
  width:90%;
`