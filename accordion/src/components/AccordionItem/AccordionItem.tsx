import React from 'react';
import { AccordionType } from '../../Types';
import './AccordionItem.css';

interface AccordionItemListProps {
  data: AccordionType[];
  handleSwitcher: (id: AccordionType['id']) => void;
}

const AccordionItem: React.FC<AccordionItemListProps> = ({ data, handleSwitcher }) => {
  return (
    <div className="accordion_list">
      {data.map((item) => (
        <div key={item.id}>
          <div className="accordion_item" onClick={() => handleSwitcher(item.id)}>
            <div className="">{item.open ? 'v' : '>'}</div>
            <div className="">{item.title}</div>
          </div>
          {item.open && item.children && (
            <div className="accordion_children">
              <AccordionItem data={item.children} handleSwitcher={handleSwitcher} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionItem;
