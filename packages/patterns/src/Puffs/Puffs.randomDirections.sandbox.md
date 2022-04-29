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
      <Puffs
        color='hsla(60, 100%, 75%, 0.5)'
        quantity={100}
        interval={3}
        duration={2}
        xOffset={[50, -100]}
        yOffset={[50, -100]}
        radiusOffset={[4, 0]}
      />
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
