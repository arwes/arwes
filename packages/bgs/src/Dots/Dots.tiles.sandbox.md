```tsx
import React, { ReactElement, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Animator } from '@arwes/animator';
import { Dots } from '@arwes/bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 1200);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator active={active} duration={{ enter: 0.75, exit: 0.75 }}>
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        <Dots
          color='hsla(120, 100%, 75%, 0.1)'
          distance={50}
          size={45}
          origin='top'
        />
      </div>
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
