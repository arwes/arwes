import React, { ReactElement, StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { Puffs } from '@arwes/bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 3000);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator
      active={active}
      duration={{ enter: 0.5, exit: 0.5, interval: 2 }}
    >
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        {/* It creates a canvas element which will ocupy the positioned
          parent container fully. */}
        <Puffs
          color='hsla(180, 100%, 75%, 0.5)'
          quantity={20}
        />
      </div>
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<StrictMode><Sandbox /></StrictMode>);
