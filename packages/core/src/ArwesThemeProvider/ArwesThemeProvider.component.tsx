import React, { ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';
import { ThemeSettings, ThemePalette, Theme, createTheme, ThemeSettingsPalette } from '@arwes/design';

interface ArwesThemeSettingsPalette extends ThemeSettingsPalette {
  text?: {
    root?: string
    headings?: string
    link?: string
    linkHover?: string
  }
}

interface ArwesThemeSettings extends ThemeSettings {
  palette?: ArwesThemeSettingsPalette
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
}

interface ArwesThemeProviderProps {
  themeSettings?: ArwesThemeSettings
  children?: ReactNode
}

const ArwesThemeProvider = (props: ArwesThemeProviderProps): ReactElement => {
  const { themeSettings, children } = props;

  const theme: ArwesTheme = createTheme({
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
      ...themeSettings?.palette,
      text: {
        root: '#7efcf6',
        headings: '#00f8f8',
        link: '#ffa76c',
        linkHover: '#ffc69f',
        ...themeSettings?.palette?.text
      }
    }
  }) as ArwesTheme;

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

export {
  ArwesTheme,
  ArwesThemeSettings,
  ArwesThemeProviderProps,
  ArwesThemeProvider
};
