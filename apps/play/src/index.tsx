import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './ga';
import { App } from './components/App';

render(
  <BrowserRouter basename='/play'>
    <Route>
      <App />
    </Route>
  </BrowserRouter>,
  document.querySelector('#root')
);
