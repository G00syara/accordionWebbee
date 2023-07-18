import React from 'react';
import { AccordionType } from '../../Types';
import AccordionItem from '../AccordionItem/AccordionItem';

interface AccordionListProps {
  data: AccordionType[];
  handleSwitcher: (id: AccordionType['id']) => void;
}

const AccordionList: React.FC<AccordionListProps> = ({ data, handleSwitcher }) => {
  return (
    <>
      {data.map((accordion) => (
        <AccordionItem key={accordion.id} accordion={accordion} handleSwitcher={handleSwitcher}>
          <AccordionList data={accordion.children} handleSwitcher={handleSwitcher} />
        </AccordionItem>
      ))}
    </>
  );
};

export default React.memo(AccordionList);
