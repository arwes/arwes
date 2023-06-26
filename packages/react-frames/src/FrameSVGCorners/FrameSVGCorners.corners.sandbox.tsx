/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGCorners } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 300,
      height: 300
    }}>
      <FrameSVGCorners
        css={{
          '[data-name=bg]': {
            color: 'hsl(60, 75%, 10%)'
          },
          '[data-name=line]': {
            color: 'hsl(60, 75%, 50%)'
          }
        }}
        cornerLength={32}
        strokeWidth={2}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
