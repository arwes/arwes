import React, { FC, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';
import { ThemeSettings, ThemePalette, Theme, createTheme } from '@arwes/design';

interface ArwesThemeSettings extends ThemeSettings {
  fontScale?: number
}

interface ArwesThemePalette extends ThemePalette {
  text: {
    root: string
    headings: string
    link: string
    linkHover: string
  }
}

interface ArwesTheme extends Theme {
  palette: ArwesThemePalette
  fontScale: number
  transitionDuration: number
}

interface ArwesThemeProviderProps {
  themeSettings?: ArwesThemeSettings
}

const ArwesThemeProvider: FC<ArwesThemeProviderProps> = props => {
  const { themeSettings, children } = props;

  const theme: ArwesTheme = useMemo(() => {
    return createTheme({
      ...themeSettings,
      breakpoints: themeSettings?.breakpoints,
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
        neutral: {
          main: '#021114'
        },
        text: {
          root: '#7efcf6',
          headings: '#00f8f8',
          link: '#ffa76c',
          linkHover: '#ffc69f'
        },
        ...themeSettings?.palette
      },
      space: themeSettings?.space ?? 5,
      outline: themeSettings?.outline ?? 1,
      shadow: {
        blur: 1,
        spread: 1,
        ...themeSettings?.shadow
      },
      fontScale: themeSettings?.fontScale ?? 1,
      transitionDuration: themeSettings?.transitionDuration ?? 150
    }) as ArwesTheme;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

ArwesThemeProvider.propTypes = {
  themeSettings: PropTypes.object
};

export { ArwesTheme, ArwesThemeProviderProps, ArwesThemeProvider };
