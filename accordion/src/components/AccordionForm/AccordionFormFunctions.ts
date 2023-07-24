import { AccordionType } from '../../Types';

export const searchAccordion = (data: AccordionType[], search: string): AccordionType[] => {
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
};
