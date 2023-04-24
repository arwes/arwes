import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeUnit } from '@arwes/theme';

const size = createThemeUnit(i => `${10 + 10 * i}px`);

const Sandbox = (): ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      {Array(5).fill(0).map((_, variantIndex) => (
        <div
          key={variantIndex}
          style={{
            margin: 10,
            width: size(variantIndex),
            height: size(variantIndex),
            background: '#0ff'
          }}
        />
      ))}
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
