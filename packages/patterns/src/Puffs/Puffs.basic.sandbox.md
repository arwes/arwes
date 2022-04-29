```tsx
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { Puffs } from '@arwes/patterns';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: '80vw',
      height: '80vh'
    }}>
      {/* It creates a canvas element which will ocupy
        the positioned parent container fully. */}
      <Puffs
        color='hsla(180, 100%, 75%, 0.5)'
        quantity={20}
        interval={3}
        duration={2}
      />
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
