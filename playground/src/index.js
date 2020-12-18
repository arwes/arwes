import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from 'react-jss';

import { theme } from './theme';
import { RouterControlsProvider } from './components/RouterControlsProvider';
import { App } from './components/App';

render(
  <ThemeProvider theme={theme}>
    <RouterControlsProvider>
      <App />
    </RouterControlsProvider>
  </ThemeProvider>,
  document.querySelector('#root')
);
