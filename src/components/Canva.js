import React, { useContext, useEffect, useRef, useState } from 'react';
import { store } from '../store/store';

export default function Canva({ sheetNumber }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const globalState = useContext(store);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 1.68;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth * 0.84}px`;
    canvas.style.height = `${window.innerHeight * 1}px`;
    canvas.style.border = '1px solid black';

    canvasRef.current.getContext('2d').scale(2, 2);
    canvasRef.current.getContext('2d').lineCap = 'round';
  }, []);

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
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

  const downloadCanva = (key) => {
    const canvas = document.getElementsByTagName('canvas');
    const imageData = canvas[key].toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.download = 'canava-image.png';
    downloadLink.href = imageData;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <div className="floating__box">
        <h4>{sheetNumber + 1}</h4>
        <button
          onClick={() => downloadCanva(sheetNumber)}
          className="btn-secondary-lg btn-secondary-sm"
        >
          Download
        </button>
      </div>
    </div>
  );
}
