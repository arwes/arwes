/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGHexagon } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 300,
      height: 300
    }}>
      <FrameSVGHexagon
        inverted
        squareSize={32}
        strokeWidth={2}
        css={{
          '& path[data-name="shape"]': {
            color: 'hsl(60, 75%, 10%)'
          },
          '& path[data-name="polyline"]': {
            color: 'hsl(60, 75%, 50%)'
          }
        }}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
