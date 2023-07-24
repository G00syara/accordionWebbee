import React, { useCallback, useState } from 'react';
import AccordionList from '../AccordionList/AccordionList';
import { AccordionType } from '../../Types';
import styled from 'styled-components';
import { searchAccordion } from './AccordionFormFunctions';

const AccordionWrapper = styled.div`
  border: 1px solid black;
  border-radius: 2%;
  padding: 5px;
  background-color: #d1d1d1;
  margin-top: 10px;
  box-shadow:
    0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
`;

const Input = styled.input`
  color: #2b2b2b;
  border-radius: 10px;
  &:focus {
    background-color: #c8c8c8;
  }
`;

interface AccordionFormProps {
  data: AccordionType[];
}

const AccordionForm: React.FC<AccordionFormProps> = ({ data }) => {
  const [accordionTree, setAccordionTree] = useState(data);
  const [accordionSearch, setAccordionSearch] = useState<string>('');

  const handleSwitcher = useCallback((id: AccordionType['id']) => {
    setAccordionTree((data) => {
      const childrenSwitcher = (children: AccordionType['children']): AccordionType[] => {
        return children.map((item) => {
          if (item.id === id) {
            return { ...item, open: !item.open };
          }
          if (item.children) {
            return { ...item, children: childrenSwitcher(item.children) };
          }
          return item;
        });
      };
      return childrenSwitcher(data);
    });
  }, []);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAccordionSearch(e.target.value);
      if (e.target.value === '') {
        return setAccordionTree(data);
      } else {
        return setAccordionTree(searchAccordion(accordionTree, e.target.value));
      }
    },
    [data, searchAccordion, accordionTree],
  );

  return (
    <>
      <Input type="text" placeholder="Поиск..." value={accordionSearch} onChange={handleSearch} />
      <AccordionWrapper>
        <AccordionList data={accordionTree} handleSwitcher={handleSwitcher} />
      </AccordionWrapper>
    </>
  );
};

export default React.memo(AccordionForm);
