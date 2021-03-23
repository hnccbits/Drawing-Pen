import React, { useContext, useState } from "react";
import "./App.css";
import Canva from "./components/Canva";
import Nav from "./components/Nav";
import { store } from "./store/store";

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
    <div style={{ position: "relative" }}>
      <Nav getSheets={getSheets} sheetCount={sheets} />
      {canvas}
    </div>
  );
}

export default App;
