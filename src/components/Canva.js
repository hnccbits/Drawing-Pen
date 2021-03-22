import React, { useContext, useEffect, useRef, useState } from "react";
import { store } from "../store/store";

export default function Canva() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const globalState = useContext(store);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 1.984;
    canvas.height = window.innerHeight * 1.9;
    canvas.style.width = `${window.innerWidth * 0.992}px`;
    canvas.style.height = `${window.innerHeight * 0.95}px`;
    canvas.style.border = "2px solid black";

    canvasRef.current.getContext("2d").scale(2, 2);
    canvasRef.current.getContext("2d").lineCap = "round";
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.lineWidth = globalState.state.strokeWidth;
    context.strokeStyle = globalState.state.color;
    contextRef.current = context;
  }, [globalState.state.strokeWidth, globalState.state.color]);

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

  return (
    <div>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        className="drawing-sheet"
      />
    </div>
  );
}
