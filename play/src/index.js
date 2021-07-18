import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import anime from 'animejs';

import './ga';
import { RouterControlsProvider } from './components/RouterControlsProvider';
import { App } from './components/App';

anime.suspendWhenDocumentHidden = false;

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
