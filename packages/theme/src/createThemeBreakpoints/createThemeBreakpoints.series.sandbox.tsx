// Change the browser viewport width to test.

import React, { type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import { createThemeBreakpoints } from '@arwes/theme';

const bps = createThemeBreakpoints([
  '400px',
  '800px',
  '1200px'
]);

const Sandbox = (): ReactElement => {
  return (
    <Fragment>
      <Global
        styles={{
          '.box': {
            margin: 20,
            width: 150,
            height: 150,
            backgroundColor: 'cyan',

            [bps.up(0)]: {
              backgroundColor: 'magenta'
            },
            [bps.up(1)]: {
              backgroundColor: 'yellow'
            },
            [bps.up(2)]: {
              backgroundColor: 'green'
            },

            [bps.down(1)]: {
              borderRadius: '30%'
            },

            [bps.between(1, 2)]: {
              transform: 'skew(-10deg)'
            }
          }
        }}
      />
      <div className='box' />
    </Fragment>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
