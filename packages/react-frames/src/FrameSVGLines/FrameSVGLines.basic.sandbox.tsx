/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGLines } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 300,
      height: 300
    }}>
      <FrameSVGLines
        css={{
          '& path[data-name="shape"]': {
            color: 'hsl(180, 75%, 10%)'
          },
          '& path[data-name="decoration"]': {
            color: 'hsl(180, 75%, 50%)'
          }
        }}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
