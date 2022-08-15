import React, { ReactElement, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/animator';
import { GridLines } from '@arwes/bgs';

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const iid = setInterval(() => setActive(active => !active), 3000);
    return () => clearInterval(iid);
  }, []);

  return (
    <Animator active={active} duration={{ enter: 0.5, exit: 0.5 }}>
      <div style={{
        position: 'relative',
        width: '80vw',
        height: '80vh'
      }}>
        {/* Canvas element will ocupy the positioned parent element. */}
        <GridLines
          lineColor='hsla(180, 100%, 75%, 0.5)'
        />
      </div>
    </Animator>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<Sandbox />);