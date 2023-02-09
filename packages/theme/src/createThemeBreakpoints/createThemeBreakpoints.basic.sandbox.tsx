// Change the browser viewport width to test.

import React, { type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import { createThemeBreakpoints } from '@arwes/theme';

const bps = createThemeBreakpoints();

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

            [bps.up('400px')]: {
              backgroundColor: 'magenta'
            },
            [bps.up('800px')]: {
              backgroundColor: 'yellow'
            },
            [bps.up('1200px')]: {
              backgroundColor: 'green'
            },

            [bps.down('800px')]: {
              borderRadius: '30%'
            },

            [bps.between('800px', '1200px')]: {
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
