import React from 'react';

import { ArwesThemeProvider } from './src/components/ArwesThemeProvider';

const wrapRootElement = ({ element }) => {
  return (
    <ArwesThemeProvider>
      {element}
    </ArwesThemeProvider>
  );
};

export { wrapRootElement };
