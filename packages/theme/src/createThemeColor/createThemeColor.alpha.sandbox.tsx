import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeColor } from '@arwes/theme';

// Calculated color alpha is always 0.5.
const color = createThemeColor(() => [180, 100, 75, 0.5]);

const Sandbox = (): ReactElement => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '1fr',
        width: 200,
        height: 100
      }}
    >
      {/* Adjust color alpha value proportional to the calculated value. */}
      <div style={{ background: color(0) }} />
      <div style={{ background: color(0, { alpha: 1 }) }} />
      <div style={{ background: color(0, { alpha: 0.5 }) }} />
      <div style={{ background: color(0, { alpha: 0.25 }) }} />
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
