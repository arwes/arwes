import React from 'react';
import { render } from 'react-dom';

import { RouterControlsProvider } from './components/RouterControlsProvider';
import { App } from './components/App';

render(
  <RouterControlsProvider>
    <App />
  </RouterControlsProvider>,
  document.querySelector('#root')
);
