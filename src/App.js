import './App.css';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import { useState } from 'react';
import Notice from './components/Notice/Notice';

export default function App() {
  const [tab, setTab] = useState('notice')
  
  return (
    <div>
      <Header>Hi</Header>

      <section>
        <div style={{ 
    display: 'grid', 
    gridTemplateColumns: '1fr 1fr', 
    gap: '10px', 
    width: '100%',
}}>
        <Button text='Журнал отметок' isActive={tab === 'theLogOfMarks'} onClick={() => setTab('theLogOfMarks')} style={{ width: '100%', margin: 0 }}></Button>
        <Button text='Отметить' isActive={tab === 'notice'} onClick={() => setTab('notice')} style={{ width: '100%', margin: 0 }}></Button>
        <div style={{ gridColumn: '1 / span 2'}}>
        <Button text='Журнал лекарств' isActive={tab === 'listOfMedicines'} onClick={() => setTab('listOfMedicines')} style={{ width: '100%', margin: 0 }}></Button>
        </div>
        </div>
        {tab === 'notice' && <Notice />}
      </section>
    </div>
  );
}