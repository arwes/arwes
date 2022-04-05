import React, { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';
import { ThemeSettings, Theme, createTheme } from '@arwes/design';

interface ArwesThemeProviderProps {
  themeSettings?: ThemeSettings
  children?: ReactNode
}

const ArwesThemeProvider = (props: ArwesThemeProviderProps): ReactElement => {
  const { themeSettings, children } = props;

  const theme: Theme = createTheme({
    ...themeSettings,
    palette: {
      primary: { main: '#00f8f8' },
      secondary: { main: '#F8F800' },
      text: { main: '#2CFFFF' },
      neutral: { main: '#021114' },
      ...themeSettings?.palette
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

ArwesThemeProvider.propTypes = {
  themeSettings: PropTypes.object,
  children: PropTypes.any
};

export { ArwesThemeProviderProps, ArwesThemeProvider };
