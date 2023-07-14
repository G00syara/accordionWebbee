import React from 'react';
import styled from 'styled-components';
import AccordionForm from './components/AccordionForm/AccordionForm';
import AccordionData from './components/model/AccordionData';

const Wrapper = styled.div`
  margin-top: 30px;
  height: 100%;
  display: grid;
  justify-content: center;
  align-content: center;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 0 #3c93d5;
  padding: 0 20px 20px 20px;
  border: 1px solid black;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

const H1 = styled.h1`
  font-family: 'Righteous', cursive;
  color: #3ca1d9;

  display: flex;
  justify-content: center;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <AppContainer>
        <H1> Аккордеоны </H1>
        <AccordionForm data={AccordionData} />
      </AppContainer>
    </Wrapper>
  );
};

export default React.memo(App);
