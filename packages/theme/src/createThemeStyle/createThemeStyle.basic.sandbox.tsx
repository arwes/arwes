import React, { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { createThemeStyle } from '@arwes/theme';

const style = createThemeStyle([
  { fontSize: '30px', color: 'red' },
  { fontSize: '24px', color: 'blue' },
  { fontSize: '18px', color: 'green' }
]);

const Sandbox = (): ReactElement => {
  return (
    <div>
      <p style={{ ...style(0) }}>Futuristic Sci-Fi UI Web Framework</p>
      <p style={{ ...style(1) }}>Futuristic Sci-Fi UI Web Framework</p>
      <p style={{ ...style(2) }}>Futuristic Sci-Fi UI Web Framework</p>
      <p style={{ ...style(3) }}>Futuristic Sci-Fi UI Web Framework</p>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
