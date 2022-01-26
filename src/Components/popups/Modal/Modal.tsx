import React from 'react';
import styled from 'styled-components';

const Modal:React.FC = ({children}) => {
  return <Container>
    {children}
  </Container>;
};

export default Modal;

const Container = styled.div`
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