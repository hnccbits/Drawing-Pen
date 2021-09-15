import React, { useContext, useState } from 'react';
import './App.css';
import Canva from './components/Canva';
import Sidebar from './components/Sidebar';
import { store } from './store/store';
import './assets/css/styles.css';

function App() {
  const { state } = useContext(store);
  const [sheets, setSheets] = useState(state.sheets);
  const canvas = [];
  for (let i = 0; i < sheets; i++) {
    canvas.push(<Canva key={i} sheetNumber={i} />);
  }

  const getSheets = (count) => {
    setSheets(count);
  };

  return (
    <main style={{ position: 'relative' }}>
      <Sidebar getSheets={getSheets} sheetCount={sheets} />
      <section className="canvas">{canvas}</section>
    </main>
  );
}

export default App;
