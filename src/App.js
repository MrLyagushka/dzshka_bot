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
        
        <Button text='Журнал отметок' isActive={tab === 'theLogOfMarks'} onClick={() => setTab('theLogOfMarks')}></Button>
        <Button text='Отметить' isActive={tab === 'notice'} onClick={() => setTab('notice')}></Button>

        {tab === 'notice' && <Notice />}
      </section>
    </div>
  );
}