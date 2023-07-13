import React, { useCallback, useState } from 'react';
import { AccordionType } from '../../Types';
import AccordionItem from '../AccordionItem/AccordionItem';
import './AccordionForm.css';

interface AccordionFormProps {
  data: AccordionType[];
}

const AccordionForm: React.FC<AccordionFormProps> = ({ data }) => {
  const [accordionTree, setAccordionTree] = useState(data);
  const [accordionSearch, setAccordionSearch] = useState<string>('');
  const openArray: number[] = [];

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

  const handleSearch = (search: string) => {
    const x: AccordionType[] = [];
    setAccordionTree((data) => {
      return data.map((accordion) => {
        openArray.push(accordion.id);
        if (childrenSearch(accordion.children, search, openArray) != x) {
          return {
            ...accordion,
            open: !accordion.open ? !accordion.open : accordion.open,
            children: childrenSearch(accordion.children, search, openArray),
          };
        } else {
          return { ...accordion, open: accordion.open ? !accordion.open : accordion.open };
        }
      });
    });
  };

  const childrenSearch = (
    children: AccordionType['children'],
    search: string,
    openArray: number[],
  ): AccordionType[] => {
    return children.map((accordion) => {
      console.log(openArray);
      console.log(openArray.includes(accordion.id) + ' Render item ' + accordion.id);
      if (accordion.title.toLowerCase().includes(search.toLowerCase()) || openArray.includes(accordion.id)) {
        return {
          ...accordion,
          open: !accordion.open ? !accordion.open : accordion.open,
          children: childrenSearch(accordion.children, search, openArray),
        };
      } else {
        return { ...accordion, open: accordion.open ? !accordion.open : accordion.open };
      }
    });
  };

  const handleSearching = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccordionSearch(e.target.value);
    if (e.target.value == '') {
      return setAccordionTree(data);
    } else {
      return handleSearch(e.target.value);
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
