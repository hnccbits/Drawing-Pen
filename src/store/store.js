import { createContext, useReducer } from 'react';
import {
  InStkWth,
  DecStkWth,
  ChangeColor,
  EraserModeOn,
  EraserModeOff,
} from '../utils/Types';

const initialState = {
  color: '#000000',
  strokeWidth: 5,
  sheets: 1,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case ChangeColor:
        initialState['color'] = action.payload;
        return initialState;

      case InStkWth:
        initialState['strokeWidth']++;
        return initialState;

      case DecStkWth:
        if (initialState['strokeWidth'] - 1 <= 1) return initialState;
        initialState['strokeWidth']--;
        return initialState;

      case EraserModeOn:
        initialState['strokeWidth'] += 50;
        initialState['color'] = '#ffffff';
        return initialState;

      case EraserModeOff:
        initialState['strokeWidth'] = action.payload.stroke;
        initialState['color'] = action.payload.color;
        return initialState;

      default:
        return initialState;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
