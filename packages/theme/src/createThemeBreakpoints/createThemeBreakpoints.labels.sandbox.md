```tsx
// Change the browser viewport width to test.

import React, { ReactElement, Fragment } from 'react';
import { render } from 'react-dom';
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
            width: 100,
            height: 100,
            backgroundColor: '#0ff',

            [bps.up('small')]: {
              width: 200,
              height: 200,
              backgroundColor: '#f0f'
            },
            [bps.up('medium')]: {
              width: 300,
              height: 300,
              backgroundColor: '#ff0'
            },
            [bps.up('large')]: {
              width: 400,
              height: 400,
              backgroundColor: '#0f0'
            },

            [bps.down('medium')]: {
              borderRadius: '30%'
            },

            [bps.between('medium', 'large')]: {
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
