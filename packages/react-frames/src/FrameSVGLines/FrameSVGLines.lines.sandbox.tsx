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
          '[data-name=bg]': {
            color: 'hsl(60, 75%, 10%)'
          },
          '[data-name=line]': {
            color: 'hsl(60, 75%, 50%)'
          }
        }}
        largeLineWidth={2}
        smallLineWidth={2}
        smallLineLength={32}
      />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
