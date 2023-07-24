export type AccordionType = {
  id: number;
  title: string;
  open: boolean;
  children: AccordionType[];
};
