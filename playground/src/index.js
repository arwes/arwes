import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { useRouterControls } from './useRouterControls';
import { playgrounds } from './playgrounds';

render(
  <App
    useRouterControls={useRouterControls}
    playgrounds={playgrounds}
  />,
  document.querySelector('#root')
);
