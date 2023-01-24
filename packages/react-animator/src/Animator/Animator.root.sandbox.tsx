// A child Animator as root, will create a new system of Animator nodes.

import React, { ReactNode, ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator, AnimatorProps } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

interface ItemProps {
  animator?: AnimatorProps
  children?: ReactNode
}

const Item = (props: ItemProps): ReactElement => {
  return (
    <Animator {...props.animator}>
      <Animated
        style={{ margin: 10, width: 40, height: 20, backgroundColor: '#0ff' }}
        animated={{
          transitions: {
            entering: { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
            exiting: { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] }
          }
        }}
      />
      <div style={{ marginLeft: 20 }}>
        {props.children}
      </div>
    </Animator>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <Animator active={active} combine>
      <Item>
        <Item>
          <Item>
            <Item />
            <Item />
          </Item>
          <Item>
            <Item />
            <Item />
          </Item>
        </Item>
        <Item>
          <Item animator={{ root: true, active: !active }}>
            <Item />
            <Item />
          </Item>
          <Item>
            <Item />
            <Item />
          </Item>
        </Item>
      </Item>

    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
