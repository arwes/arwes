```tsx
import React from 'react';
import { render } from 'react-dom';
import { animate } from 'motion';
import { Animator, useAnimator } from '@arwes/animator';

const Item = () => {
  const elementRef = React.useRef();
  const animator = useAnimator();

  React.useEffect(() => {
    const subscriber = node => {
      const { duration } = node.control.getSettings();

      switch (node.getState()) {
        case 'entering': {
          animate(
            elementRef.current,
            { x: [0, 100], backgroundColor: ['#0ff', '#ff0'] },
            { duration: duration.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            elementRef.current,
            { x: [100, 0], backgroundColor: ['#ff0', '#0ff'] },
            { duration: duration.enter }
          );
          break;
        }
      }
    };

    animator.node.subscribers.add(subscriber);

    return () => {
      animator.node.subscribers.delete(subscriber);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        margin: 20,
        width: 100,
        height: 100,
        backgroundColor: '#0ff'
      }}
    />
  );
};

const Sandbox = () => {
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    const tid = setTimeout(() => setActive(!active), 2000);
    return () => clearTimeout(tid);
  }, [active]);

  return (
    <Animator active={active}>
      <Item />
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
