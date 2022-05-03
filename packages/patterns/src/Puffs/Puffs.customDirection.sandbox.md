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
          color='hsla(180, 100%, 75%, 0.5)'
          quantity={100}
          xOffset={[10, 50]}
          yOffset={[-20, -80]}
          radiusOffset={[4, 20]}
        />
      </div>
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
