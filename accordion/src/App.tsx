import React from 'react';
import AccordionForm from './components/AccordionForm/AccordionForm';
import AccordionData from './components/model/AccordionData';
import './css/App.css';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <h1 className="wrapper_h1"> Аккордеоны </h1>
      <AccordionForm data={AccordionData} />
    </div>
  );
};

export default React.memo(App);
