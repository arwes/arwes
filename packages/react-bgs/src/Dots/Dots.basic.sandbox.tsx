import React, { type ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Dots } from '@arwes/react-bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 3000);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator active={active} duration={{ enter: 2, exit: 2 }}>
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        {/* Canvas element will ocupy the positioned parent element. */}
        <Dots
          color='hsla(180, 100%, 75%, 0.4)'
        />
      </div>
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
