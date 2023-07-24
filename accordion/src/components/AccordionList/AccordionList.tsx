import React from 'react';
import { AccordionType } from '../../Types';
import AccordionItem from '../AccordionItem/AccordionItem';
import styled from 'styled-components';

const AccordionChildren = styled.div`
  padding: 0 0 0 15px;
`;

interface AccordionListProps {
  data: AccordionType[];
  handleSwitcher: (id: AccordionType['id']) => void;
}

const AccordionList: React.FC<AccordionListProps> = ({ data, handleSwitcher }) => {
  return (
    <>
      {data.map((accordion) => (
        <AccordionItem key={accordion.id} accordion={accordion} handleSwitcher={handleSwitcher}>
          <AccordionChildren>
            <AccordionList data={accordion.children} handleSwitcher={handleSwitcher} />
          </AccordionChildren>
        </AccordionItem>
      ))}
    </>
  );
};

export default React.memo(AccordionList);
