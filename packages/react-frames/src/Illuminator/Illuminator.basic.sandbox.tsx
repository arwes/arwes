import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Illuminator } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div>
      <p style={{ color: '#fff' }}>Move mouse over the page.</p>
      <div
        style={{
          position: 'relative',
          width: 300,
          height: 300,
          overflow: 'hidden',
          clipPath: `polygon(
            0 100%,
            0 40px,
            40px 0,
            100% 0,
            100% calc(100% - 40px),
            calc(100% - 40px) 100%
          )`
        }}
      >
        <Illuminator
          color='hsl(180 50% 50% / 10%)'
          size={300}
        />
      </div>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
