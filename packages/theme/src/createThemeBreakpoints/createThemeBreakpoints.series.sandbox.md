```tsx
// Change the browser viewport width to test.

import React, { ReactElement, Fragment } from 'react';
import { render } from 'react-dom';
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
            width: 100,
            height: 100,
            backgroundColor: '#0ff',

            [bps.up(0)]: {
              width: 200,
              height: 200,
              backgroundColor: '#f0f'
            },
            [bps.up(1)]: {
              width: 300,
              height: 300,
              backgroundColor: '#ff0'
            },
            [bps.up(2)]: {
              width: 400,
              height: 400,
              backgroundColor: '#0f0'
            },

            [bps.down(1)]: {
              borderRadius: '30%'
            },

            [bps.between(1, 2)]: {
              transform: 'rotate(45deg)'
            }
          }
        }}
      />
      <div className='box' />
    </Fragment>
  );
}

render(<Sandbox />, document.querySelector('#root'));
```
