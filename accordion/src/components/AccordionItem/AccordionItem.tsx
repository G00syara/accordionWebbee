import React from 'react';
import styled from 'styled-components';
import { AccordionType } from '../../Types';

const AccordionChildren = styled.div`
  padding: 0 0 0 15px;
`;

const AccordionItemDiv = styled.div`
  font-family: 'Righteous', cursive;
  padding: 5px;
  margin: 5px;
  justify-content: space-between;
  border-radius: 15px;
  background-color: #ebebeb;
  border: 1px solid black;
`;

interface AccordionItemProps {
  accordion: AccordionType;
  handleSwitcher: (id: AccordionType['id']) => void;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ accordion, handleSwitcher, children }) => {
  console.log('Render item ' + accordion.id);

  return (
    <>
      <div key={accordion.id}>
        <AccordionItemDiv onClick={() => handleSwitcher(accordion.id)}>
          {accordion.open ? 'v' : '>'}
          {' ' + accordion.title}
        </AccordionItemDiv>
        {accordion.open && accordion.children && <AccordionChildren>{children}</AccordionChildren>}
      </div>
    </>
  );
};

export default React.memo(AccordionItem);
