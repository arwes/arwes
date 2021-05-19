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
      primary: {
        light3: '#befcfe',
        light2: '#7efcf6',
        light1: '#3efbfb',
        main: '#00f8f8',
        dark1: '#05c6c1',
        dark2: '#0b8481',
        dark3: '#15333c'
      },
      secondary: {
        light3: '#ffece1',
        light2: '#ffe4d2',
        light1: '#ffc69f',
        main: '#ffa76c',
        dark1: '#f66901',
        dark2: '#e24a0f',
        dark3: '#a32d08'
      },
      text: {
        main: '#7efcf6'
      },
      neutral: {
        main: '#021114'
      },
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
