import React, { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { Dots } from '@arwes/bgs';

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
        {/* It creates a canvas element which will ocupy the positioned
          parent container fully. */}
        <Dots
          color='hsla(180, 100%, 75%, 0.4)'
        />
      </div>
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);
