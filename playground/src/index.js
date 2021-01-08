import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './ga';
import { RouterControlsProvider } from './components/RouterControlsProvider';
import { App } from './components/App';

render(
  <BrowserRouter>
    <Route>
      <RouterControlsProvider>
        <App />
      </RouterControlsProvider>
    </Route>
  </BrowserRouter>,
  document.querySelector('#root')
);
