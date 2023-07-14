import React, { useCallback, useState, useMemo } from 'react';
import { AccordionType } from '../../Types';
import AccordionItem from '../AccordionItem/AccordionItem';
import './AccordionForm.css';

interface AccordionFormProps {
  data: AccordionType[];
}

const AccordionForm: React.FC<AccordionFormProps> = ({ data }) => {
  const [accordionTree, setAccordionTree] = useState(data);
  const [accordionSearch, setAccordionSearch] = useState<string>('');

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
    return children.map((accordion) => {
      if (accordion.id === id) {
        return { ...accordion, open: !accordion.open };
      } else if (accordion.children) {
        return { ...accordion, children: childrenSwitcher(accordion.children, id) };
      }
      return accordion;
    });
  };

  const handleSearch = (data: AccordionType[], search: string): AccordionType[] => {
    return data.map((accordion) => {
      const childrenAccordion = handleSearch(accordion.children, search);
      const isOpen =
        childrenAccordion.some((child) => child.open) ||
        childrenAccordion.some((child) => child.title.toLowerCase().includes(search.toLowerCase()));
      return {
        ...accordion,
        open: isOpen,
        children: childrenAccordion,
      };
    });
  };

  const handleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccordionSearch(e.target.value);
    if (e.target.value == '') {
      return setAccordionTree(data);
    } else {
      return setAccordionTree(handleSearch(accordionTree, e.target.value));
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Поиск..."
        value={accordionSearch}
        onChange={handleSearching}
        className="simple_input"
      />
      <div className="accordion">
        <AccordionItem data={accordionTree} handleSwitcher={handleSwitcher} />
      </div>
    </>
  );
};

export default React.memo(AccordionForm);
