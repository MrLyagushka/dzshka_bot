import './App.css';
import Header from './components/Header/Header';
import Button from './components/Button/Button';
import { useState } from 'react';

export default function App() {
  return (
    <div>
      <Header>Hi</Header>

      <section>
        <Button text='Журнал отметок'></Button>
        <Button text='Отметить'></Button>
      </section>
    </div>
  );
}