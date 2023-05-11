import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { type AnimatorProps, Animator } from '@arwes/react-animator';
import { Animated } from '@arwes/react-animated';

interface ItemProps extends AnimatorProps {}

const Item = (props: ItemProps): ReactElement => {
  return (
    <Animator {...props}>
      <Animated
        style={{ margin: 10, width: 40, height: 20, backgroundColor: '#777' }}
        animated={{
          transitions: {
            entering: { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
            exiting: { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] }
          }
        }}
        hideOnExited={false}
      />
    </Animator>
  );
};

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);
  const [firstEnabled, setFirstEnabled] = useState(true);

  useEffect(() => {
    const tid = setInterval(() => setActive(active => !active), 2000);
    return () => clearInterval(tid);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setFirstEnabled(v => !v)}>
          {firstEnabled ? 'Enable Second' : 'Enable First'}
        </button>
      </div>

      <Animator
        active={active}
        combine
        manager='switch'
        // Dependency list to check when to send the action.
        checkToSend={[firstEnabled]}
        // The action to send when the dependency list changes.
        // "refresh" action checks for children nodes updates.
        checkToSendAction='refresh'
      >
        <Item condition={() => firstEnabled} />
        <Item condition={() => !firstEnabled} />
      </Animator>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
