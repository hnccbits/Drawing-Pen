import React, { useContext, useState } from 'react';
import { store } from './store/store';

import { NotificationContainer } from 'react-notifications';

import Canva from './components/Canva';
import Sidebar from './components/Sidebar';

import './App.css';
import './assets/css/styles.css';
import 'react-notifications/lib/notifications.css';

function App() {
  const { state } = useContext(store);
  const [sheets, setSheets] = useState(state.sheets);
  const [isOpen, setIsOpen] = useState(false);
  const canvas = [];
  for (let i = 0; i < sheets; i++) {
    canvas.push(<Canva key={i} sheetNumber={i} />);
  }

  const getSheets = (count) => {
    setSheets(count);
  };

  return (
    <main style={{ position: 'relative' }}>
      <NotificationContainer />
      <Sidebar
        getSheets={getSheets}
        sheetCount={sheets}
        openModal={() => setIsOpen(!isOpen)}
      />
      <section className="canvas">{canvas}</section>
    </main>
  );
}

export default App;
