```tsx
import React, { ReactNode, ReactElement, useState, useRef, useEffect } from 'react';
import { render } from 'react-dom';
import { animate } from 'motion';
import { AnimatorSystemNode, AnimatorProps, Animator, useAnimator } from '@arwes/animator';

const AnimatorUIListener = (): ReactElement => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animator = useAnimator();

  useEffect(() => {
    const subscriber = (node: AnimatorSystemNode) => {
      const { duration } = node.control.getSettings();

      switch (node.getState()) {
        case 'entering': {
          animate(
            elementRef.current,
            { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
            { duration: duration.enter }
          );
          break;
        }
        case 'exiting': {
          animate(
            elementRef.current,
            { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] },
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
      style={{ margin: 10, width: 40, height: 20, backgroundColor: '#0ff' }}
    />
  );
};

interface ItemProps {
  animator?: AnimatorProps
  children?: ReactNode
}

const Item = (props: ItemProps): ReactElement => {
  return (
    <Animator {...props.animator}>
      <AnimatorUIListener />
      <div style={{ marginLeft: 20 }}>
        {props.children}
      </div>
    </Animator>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setTimeout(() => setActive(!active), 2000);
    return () => clearTimeout(tid);
  }, [active]);

  return (
    <Animator active={active} combine>
      <Item>
        <Item />
        <Item />
        <Item />
        <Item />
      </Item>
      <Item>
        <Item />
        {/* The item will have its corresponding Animator disabled, so
        it will work with the closest parent Animator. */}
        <Item animator={{ disabled: true }} />
        <Item />
        <Item />
      </Item>
    </Animator>
  );
};

render(<Sandbox />, document.querySelector('#root'));
```
