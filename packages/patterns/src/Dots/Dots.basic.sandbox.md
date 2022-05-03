```tsx
import React, { ReactElement, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Dots } from '@arwes/patterns';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 2100);
    return () => clearInterval(iid);
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '80vw',
      height: '80vh'
    }}>
      {/* It creates a canvas element which will ocupy the positioned
        parent container fully. */}
      <Dots
        color='hsla(180, 100%, 75%, 0.4)'
        active={active}
        duration={2}
      />
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
