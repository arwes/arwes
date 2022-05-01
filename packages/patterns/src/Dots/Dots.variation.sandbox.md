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
      <Dots
        color='hsla(60, 100%, 75%, 0.5)'
        type='circle'
        duration={4}
        distance={30}
        size={4}
        origin={[0, 1]}
      />
    </div>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
