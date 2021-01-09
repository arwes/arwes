import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';

const theme = {
  typography: {
    content: '"Titillium Web", sans-serif',
    monospace: '"Source Code Pro", monospace'
  },
  color: {
    neutral: '#000909',
    section: '#031214',
    border: '#06d8d7',
    content: '#a1ecfb',
    active: '#d4f6fd',
    link: '#51d4ff',
    error: '#ce003e'
  },
  breakpoints: {
    tablet: 768,
    tabletUp: '@media (min-width: 768px)',
    tabletDown: '@media (max-width: 767px)'
  }
};

const ArwesThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

ArwesThemeProvider.propTypes = {
  children: PropTypes.any
};

export { ArwesThemeProvider };
