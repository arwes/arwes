```tsx
import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import { Animator } from '@arwes/animator';
import { Puffs } from '@arwes/patterns';

const Sandbox = (): ReactElement => {
  return (
    <Animator
      duration={{
        enter: 0.5,
        exit: 0.5,
        interval: 1.5,
        // Duration between one interval animation and the next.
        intervalPause: 1
      }}
    >
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        <Puffs
          color='hsla(60, 100%, 75%, 0.5)'
          quantity={100}
          // Move to the right.
          xOffset={[10, 50]}
          // Move to the top.
          yOffset={[-20, -80]}
          // Change of puff radius.
          radiusOffset={[4, 20]}
          // 1 set per interval animation.
          sets={1}
        />
      </div>
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
