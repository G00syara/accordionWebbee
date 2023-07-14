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

interface AccordionItemListProps {
  data: AccordionType[];
  handleSwitcher: (id: AccordionType['id']) => void;
}

const AccordionItem: React.FC<AccordionItemListProps> = ({ data, handleSwitcher }) => {
  return (
    <>
      {data.map((item) => (
        <div key={item.id}>
          <AccordionItemDiv onClick={() => handleSwitcher(item.id)}>
            {item.open ? 'v' : '>'}
            {' ' + item.title}
          </AccordionItemDiv>
          {item.open && item.children && (
            <AccordionChildren>
              <AccordionItem data={item.children} handleSwitcher={handleSwitcher} />
            </AccordionChildren>
          )}
        </div>
      ))}
    </>
  );
};

export default React.memo(AccordionItem);
