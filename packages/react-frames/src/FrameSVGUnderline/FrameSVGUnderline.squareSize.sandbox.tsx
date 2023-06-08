/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameSVGUnderline } from '@arwes/react-frames';

const Sandbox = (): ReactElement => {
  return (
    <div style={{
      position: 'relative',
      width: 300,
      height: 300
    }}>
      <FrameSVGUnderline
        css={{
          '[data-name=bg]': {
            color: 'hsl(60, 75%, 10%)'
          },
          '[data-name=line]': {
            color: 'hsl(60, 75%, 50%)'
          }
        }}
        squareSize={32}
        strokeWidth={3}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
