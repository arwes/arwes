import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Puffs } from '@arwes/react-bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 3000);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator
      active={active}
      duration={{
        // The duration of an individual animation sequence.
        interval: 2
      }}
    >
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        {/* Canvas element will ocupy the positioned parent element. */}
        <Puffs
          color='hsla(180, 100%, 75%, 0.5)'
          quantity={20}
        />
      </div>
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
