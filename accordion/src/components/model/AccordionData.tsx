import { AccordionType } from '../../Types';

const AccordionData: AccordionType[] = [
  {
    id: 1,
    title: 'Заголовок 1',
    open: false,
    children: [],
  },
  {
    id: 2,
    title: 'Заголовок 2',
    open: false,
    children: [
      {
        id: 3,
        title: 'Подзаголовок 1, заголовка 2',
        open: false,
        children: [],
      },
      {
        id: 4,
        title: 'Подзаголовок 2, заголовка 2',
        open: false,
        children: [],
      },
      {
        id: 5,
        title: 'Подзаголовок 706, заголовка 2',
        open: false,
        children: [],
      },
      {
        id: 6,
        title: 'Подзаголовок 806, заголовка 2',
        open: false,
        children: [
          {
            id: 7,
            title: 'Подзаголовок 1120, подзаголовка 806, заголовка 2',
            open: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: 'Заголовок 3',
    open: false,
    children: [
      {
        id: 9,
        title: 'Подзаголовок 505, заголовка 3',
        open: false,
        children: [
          {
            id: 10,
            title: 'Подзаголовок 444, подзаголовка 505, заголовка 3',
            open: false,
            children: [
              {
                id: 11,
                title: 'Подзаголовок 333, подзаголовка 404, подзаголовка 505, заголовка 3',
                open: false,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];
export default AccordionData;
