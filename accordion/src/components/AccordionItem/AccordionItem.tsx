import React, { memo, useMemo, useState } from 'react';
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

const compareChildren = (prevChildren: AccordionType[], nextChildren: AccordionType[]) => {
  if (prevChildren.length !== nextChildren.length) {
    return false; // Если количество дочерних элементов изменилось, перерисовываем компонент
  }

  for (let i = 0; i < prevChildren.length; i++) {
    if (prevChildren[i].open !== nextChildren[i].open) {
      return false; // Если свойство open любого из дочерних элементов изменилось, перерисовываем компонент
    }

    if (prevChildren[i].children.length && nextChildren[i].children.length) {
      const areNestedChildrenEqual = compareChildren(prevChildren[i].children, nextChildren[i].children);

      if (!areNestedChildrenEqual) {
        return false; // Если какой-либо из вложенных дочерних элементов изменился, перерисовываем компонент
      }
    }
  }

  return true; // Если изменений в дочерних элементах или вложенных дочерних элементах не обнаружено, не перерисовываем компонент
};

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

export default React.memo(AccordionItem, (prevProps, nextProps) => {
  if (
    prevProps.accordion.open !== nextProps.accordion.open ||
    prevProps.accordion.title !== nextProps.accordion.title ||
    prevProps.accordion.id !== nextProps.accordion.id
  ) {
    return false;
  }

  return compareChildren(prevProps.accordion.children, nextProps.accordion.children);
});
