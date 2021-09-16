import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import { StateProvider } from './store/store';
import { v4 } from 'uuid';

ReactDOM.render(
  <BrowserRouter>
    <StateProvider>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/draw/${v4()}`} />
        </Route>
        <Route path="/draw/:id">
          <App />
        </Route>
      </Switch>
    </StateProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
