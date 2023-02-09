// Change the browser viewport width to test.

import React, { type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import { createThemeBreakpoints } from '@arwes/theme';

const bps = createThemeBreakpoints([
  { key: 'small', value: '400px' },
  { key: 'medium', value: '800px' },
  { key: 'large', value: '1200px' }
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

            [bps.up('small')]: {
              backgroundColor: 'magenta'
            },
            [bps.up('medium')]: {
              backgroundColor: 'yellow'
            },
            [bps.up('large')]: {
              backgroundColor: 'green'
            },

            [bps.down('medium')]: {
              borderRadius: '30%'
            },

            [bps.between('medium', 'large')]: {
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
