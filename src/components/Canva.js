import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import { useParams } from 'react-router';
import { io } from 'socket.io-client';
import { store } from '../store/store';
import MTYPES from '../utils/MTypes';
import CreateNotifications from '../utils/Notification';

const ENDPOINT = 'http://localhost:5000';

export default function Canva({ sheetNumber }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [socket, setSocket] = useState();
  const { id: drawId } = useParams();

  const { state } = useContext(store);

  useEffect(() => {
    const s = io(ENDPOINT);
    setSocket(s);

    return () => s.disconnect();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.once('loadDrawing', (data) => {
      CreateNotifications(MTYPES.success, 'Securely Connected');
    });

    socket.emit('getDrawing', drawId);
  }, [socket, drawId]);

  const draw = useCallback(
    ({ nativeEvent }) => {
      const context = canvasRef.current.getContext('2d');
      if (!isDrawing) {
        return;
      }
      const { offsetX, offsetY } = nativeEvent;
      context.strokeStyle = state.color;
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();

      socket.emit('sendData', {
        offsetX,
        offsetY,
        sheet: sheetNumber,
        color: state.color,
      });
    },
    [isDrawing, sheetNumber, socket, state.color]
  );

  useEffect(() => {
    if (!socket) return;
    const context = canvasRef.current.getContext('2d');

    socket.on('recieveData', ({ offsetX, offsetY, sheet, color }) => {
      if (sheet === sheetNumber) {
        contextRef.current.lineTo(offsetX, offsetY);
        context.strokeStyle = color;
        contextRef.current.stroke();
      }
    });
  }, [socket, sheetNumber, draw]);

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
    context.lineWidth = state.strokeWidth;
    context.strokeStyle = state.color;
    contextRef.current = context;
  }, [state.color, state.strokeWidth]);

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
