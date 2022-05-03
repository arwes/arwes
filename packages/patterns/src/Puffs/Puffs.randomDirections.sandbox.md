```tsx
import React, { ReactElement, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Animator } from '@arwes/animator';
import { Puffs } from '@arwes/patterns';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator
      active={active}
      duration={{ enter: 0.5, exit: 0.5, interval: 1.5 }}
    >
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        <Puffs
          color='hsla(60, 100%, 75%, 0.5)'
          quantity={100}
          xOffset={[50, -100]}
          yOffset={[50, -100]}
          radiusOffset={[4, 0]}
        />
      </div>
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
