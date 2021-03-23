import React, { useContext, useState } from "react";
import { store } from "../store/store";
import {
  ChangeColor,
  DecStkWth,
  EraserModeOff,
  EraserModeOn,
  InStkWth,
} from "../store/Types";

export default function Nav({ getSheets, sheetCount }) {
  const { state, dispatch } = useContext(store);
  const [stroke, setStroke] = useState(state.strokeWidth);
  const [color, setColor] = useState("black");
  const [eraserMode, setEraserMode] = useState(true);

  const handleSheets = (change) => {
    if (change + sheetCount <= 1) getSheets(1);
    else {
      sheetCount += change;
      getSheets(sheetCount);
    }
  };

  const handleEraser = () => {
    if (eraserMode) {
      dispatch({ type: EraserModeOn });
    } else {
      dispatch({ type: EraserModeOff, payload: { stroke, color } });
    }
  };
  return (
    <div className="sticky-top">
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand">Drawing Tool</div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <span className="stroke">Stroke: {stroke}</span>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary btn-sm"
                style={{ marginRight: "1rem" }}
                onClick={() => {
                  dispatch({ type: InStkWth });
                  setStroke(state.strokeWidth);
                }}
              >
                +
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  dispatch({ type: DecStkWth });
                  setStroke(state.strokeWidth);
                }}
              >
                -
              </button>
            </li>
            <li className="nav-item">
              <span className="stroke">Sheets: {sheetCount}</span>
              <button
                style={{ marginRight: "1rem" }}
                className="btn btn-primary btn-sm"
                onClick={() => handleSheets(1)}
              >
                +
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSheets(-1)}
              >
                -
              </button>
            </li>
            <li className="nav-item">
              <span style={{ textTransform: "capitalize" }} className="stroke">
                Color: {color}{" "}
              </span>
              <input
                type="color"
                value={state.color}
                onChange={(e) => {
                  setColor(e.target.value);
                  dispatch({ type: ChangeColor, payload: e.target.value });
                }}
              ></input>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-primary btn-md"
                style={{ margin: "0 1rem" }}
                onClick={() => {
                  handleEraser();
                  setEraserMode(!eraserMode);
                }}
              >
                {`${eraserMode ? "Eraser Mode Off" : "Eraser Mode On"}`}
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
