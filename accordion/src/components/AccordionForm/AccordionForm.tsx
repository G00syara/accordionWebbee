import React, { useState } from 'react';
import { AccordionType } from '../../Types';
import AccordionItem from '../AccordionItem/AccordionItem';
import './AccordionForm.css';

interface AccordionFormProps {
  data: AccordionType[];
}

const AccordionForm: React.FC<AccordionFormProps> = ({ data }) => {
  const [accordionTree, setAccordionTree] = useState(data);

  const handleSwitcher = (id: AccordionType['id']) => {
    setAccordionTree((accordions) => {
      return accordions.map((accordion) => {
        if (accordion.id === id) {
          return { ...accordion, open: !accordion.open };
        }
        if (accordion.children) {
          return { ...accordion, children: childrenSwitcher(accordion.children, id) };
        }
        return accordion;
      });
    });
  };

  const childrenSwitcher = (children: AccordionType['children'], id: AccordionType['id']): AccordionType[] => {
    return children.map((item) => {
      if (item.id === id) {
        return { ...item, open: !item.open };
      } else if (item.children.length > 0) {
        return { ...item, children: childrenSwitcher(item.children, id) };
      }
      return item;
    });
  };

  return (
    <div className="accordion">
      <AccordionItem data={accordionTree} handleSwitcher={handleSwitcher} />
    </div>
  );
};

export default AccordionForm;
