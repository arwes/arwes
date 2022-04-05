```tsx
import React, { ReactElement, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Animator } from '@arwes/animator';
import { Animated } from '@arwes/animated';

const Sandbox = (): ReactElement => {
  return (
    <Animator disabled>
      <Animated
        style={{ margin: 10, width: 40, height: 40, backgroundColor: '#777' }}
        animated={{
          initialStyle: { x: 0, backgroundColor: '#0ff' },
          transitions: {
            entering: { x: [0, 100], backgroundColor: '#ff0' },
            exiting: { x: [100, 0], backgroundColor: '#0ff' }
          }
        }}
      />
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
