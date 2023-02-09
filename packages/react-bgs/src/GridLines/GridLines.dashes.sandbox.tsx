import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { GridLines } from '@arwes/react-bgs';

const Sandbox = (): ReactElement => {
  return (
    <Animator duration={{ enter: 0.5, exit: 0.5 }}>
      <GridLines
        lineColor='hsla(180, 100%, 75%, 0.2)'
        lineWidth={2}
        distance={40}
        horizontalLineDash={[4]}
        verticalLineDash={[4]}
      />
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
