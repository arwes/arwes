```tsx
import React, { ReactElement, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Dots } from '@arwes/patterns';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 1200);
    return () => clearInterval(iid);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '80vw',
      height: '80vh'
    }}>
      <Dots
        color='hsla(120, 100%, 75%, 0.1)'
        active={active}
        duration={0.75}
        distance={50}
        size={45}
        origin='top'
      />
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
