import React, { useCallback, useState, useMemo } from 'react';
import { AccordionType } from '../../Types';
import AccordionItem from '../AccordionItem/AccordionItem';
import styled from 'styled-components';

const AccordionDiv = styled.div`
  border: 1px solid black;
  border-radius:2%;
  padding: 5px;
  background-color: #d1d1d1;
  margin: 10px;
  box-shadow:
  0 14px 28px rgba(0, 0, 0, 0.25),
  0 10px 10px rgba(0, 0, 0, 0.22);
}
`;

const Input = styled.input`
color: #2b2b2b;
border-radius:10px;
  &:focus {
    background-color: #c8c8c8;
  }
}
`;

interface AccordionFormProps {
  data: AccordionType[];
}

const AccordionForm: React.FC<AccordionFormProps> = ({ data }) => {
  const [accordionTree, setAccordionTree] = useState(data);
  const [accordionSearch, setAccordionSearch] = useState<string>('');

  const handleSwitcher = useCallback(
    (id: AccordionType['id']) => {
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
    },
    [accordionTree],
  );

  const childrenSwitcher = useCallback(
    (children: AccordionType['children'], id: AccordionType['id']): AccordionType[] => {
      return children.map((accordion) => {
        if (accordion.id === id) {
          return { ...accordion, open: !accordion.open };
        } else if (accordion.children) {
          return { ...accordion, children: childrenSwitcher(accordion.children, id) };
        }
        return accordion;
      });
    },
    [accordionTree],
  );

  const searchAccordion = useCallback(
    (data: AccordionType[], search: string): AccordionType[] => {
      return data.map((accordion) => {
        const childrenAccordion = searchAccordion(accordion.children, search);
        const isOpen =
          childrenAccordion.some((child) => child.open) ||
          childrenAccordion.some((child) => child.title.toLowerCase().includes(search.toLowerCase()));
        return {
          ...accordion,
          open: isOpen,
          children: childrenAccordion,
        };
      });
    },
    [accordionTree],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAccordionSearch(e.target.value);
      if (e.target.value == '') {
        return setAccordionTree(data);
      } else {
        return setAccordionTree(searchAccordion(accordionTree, e.target.value));
      }
    },
    [accordionTree],
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Поиск..."
        value={accordionSearch}
        onChange={handleSearch}
        className="simple_input"
      />
      <AccordionDiv>
        <AccordionItem data={accordionTree} handleSwitcher={handleSwitcher} />
      </AccordionDiv>
    </>
  );
};

export default React.memo(AccordionForm);
