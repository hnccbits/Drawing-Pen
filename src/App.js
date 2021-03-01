import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [color, setColor] = useState("black");
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [darkMode, setDarkMode] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.lineWidth = 5;
    context.strokeStyle = "black";
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const increaseStrokeWidth = () => {
    if (strokeWidth > 10) return;

    setStrokeWidth(strokeWidth + 1);
    contextRef.current.lineWidth = strokeWidth;
  };

  const decreaseStrokeWidth = () => {
    if (strokeWidth < 2) return;
    setStrokeWidth(strokeWidth - 1);
    contextRef.current.lineWidth = strokeWidth;
  };

  const strokeColor = (selectedColor) => {
    setColor(selectedColor);
    contextRef.current.strokeStyle = color;
  };

  const changeMode = () => {
    if (darkMode) {
      canvasRef.current.style.background = "black";
      contextRef.current.strokeStyle = "white";
      setDarkMode(!darkMode);
      setColor("white");
    } else {
      canvasRef.current.style.background = "white";
      contextRef.current.strokeStyle = "black";
      setDarkMode(!darkMode);
      setColor("black");
    }
  };

  return (
    <div>
      <div className="navbar">
        <span>{`Stroke Width: ${strokeWidth}`} </span>
        <button onClick={increaseStrokeWidth}>+</button>
        <button onClick={decreaseStrokeWidth}>-</button>

        <span style={{ textTransform: "uppercase" }}>
          {" "}
          {`Stroke Color: ${color} `}{" "}
        </span>
        <input
          type="color"
          value={color}
          onChange={(e) => strokeColor(e.target.value)}
        />
        <label>Dark Mode</label>
        <input type="checkbox" value={darkMode} onClick={changeMode}></input>
      </div>

      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}

export default App;
