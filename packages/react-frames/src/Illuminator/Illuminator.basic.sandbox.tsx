import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createFrameOctagonClip } from '@arwes/frames';
import { Illuminator } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div>
      <p style={{ color: '#fff' }}>Move mouse over the page.</p>
      <div
        style={{
          width: 300,
          height: 300,
          clipPath: createFrameOctagonClip({ squareSize: 50 })
        }}
      >
        <Illuminator
          color='hsl(180 50% 50% / 20%)'
          size={300}
        />
      </div>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
