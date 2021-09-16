import { useContext, useState } from 'react';
import { store } from '../store/store';
import {
  ChangeColor,
  DecStkWth,
  EraserModeOff,
  EraserModeOn,
  InStkWth,
} from '../utils/Types';
import Logo from '../assets/images/Logo.png';

const Sidebar = ({ getSheets, sheetCount, openModal }) => {
  const { state, dispatch } = useContext(store);
  const [stroke, setStroke] = useState(state.strokeWidth);
  const [color, setColor] = useState('#000000');
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
    <section className="sidebar">
      <div className="sidebar__header">
        <div>
          <img height="100px" src={Logo} alt="Drawing Pen Logo" />
        </div>
        <h2>Drawing Pen</h2>
      </div>
      <div className="sidebar__menu px-sm">
        <div className="menu__item my-md">
          <div className="menu__item-header row no-wrap space-bw">
            <h4>Stroke Width</h4>
            <div className="row no-wrap">
              <button
                onClick={() => {
                  dispatch({ type: InStkWth });
                  setStroke(state.strokeWidth);
                }}
                className="btn-primary-sm mx-md"
              >
                +
              </button>
              <button
                onClick={() => {
                  dispatch({ type: DecStkWth });
                  setStroke(state.strokeWidth);
                }}
                className="btn-primary-sm"
              >
                -
              </button>
            </div>
          </div>
          <div className="menu__item-content">
            <p>{stroke}</p>
          </div>
        </div>
        <div className="menu__item my-md">
          <div className="menu__item-header row no-wrap space-bw">
            <h4>Sheets</h4>
            <div className="row no-wrap">
              <button
                onClick={() => handleSheets(1)}
                className="btn-primary-sm mx-md"
              >
                +
              </button>
              <button
                onClick={() => handleSheets(-1)}
                className="btn-primary-sm"
              >
                -
              </button>
            </div>
          </div>
          <div className="menu__item-content">
            <p>{sheetCount}</p>
          </div>
        </div>
        <div className="menu__item my-md">
          <div className="menu__item-header row no-wrap space-bw">
            <h4>Color</h4>
            <div className="row no-wrap">
              <input
                value={state.color}
                onChange={(e) => {
                  setColor(e.target.value);
                  dispatch({ type: ChangeColor, payload: e.target.value });
                }}
                type="color"
              />
            </div>
          </div>
          <div className="menu__item-content">
            <p>{color}</p>
          </div>
        </div>
        <div className="menu__item my-md pd-btm">
          <button
            onClick={() => {
              handleEraser();
              setEraserMode(!eraserMode);
            }}
            className="btn-secondary-lg"
          >
            Eraser {`${eraserMode ? 'Off' : 'On'}`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
