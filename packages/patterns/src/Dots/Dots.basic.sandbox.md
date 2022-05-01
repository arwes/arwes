```tsx
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { Dots } from '@arwes/patterns';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: '80vw',
      height: '80vh'
    }}>
      {/* It creates a canvas element which will ocupy
        the positioned parent container fully. */}
      <Dots
        color='hsla(180, 100%, 75%, 0.5)'
        duration={2}
      />
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
