import React, { ReactElement, StrictMode, Fragment, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import {
  ThemeSettingsMultiplier,
  ThemeSettingsColor,
  ThemeSettingsStyle,
  ThemeMultiplier,
  ThemeColor,
  ThemeStyle,
  ThemeCreatorStructure,
  createCreateTheme
} from '@arwes/theme';

interface ThemeSettings {
  space: ThemeSettingsMultiplier
  outline: ThemeSettingsMultiplier
  font: ThemeSettingsStyle
  palette: {
    primary: ThemeSettingsColor
    secondary: ThemeSettingsColor
  }
}

interface Theme {
  space: ThemeMultiplier
  outline: ThemeMultiplier
  font: ThemeStyle
  palette: {
    primary: ThemeColor
    secondary: ThemeColor
  }
}

const themeStructure: ThemeCreatorStructure = {
  space: 'multiplier',
  outline: 'multiplier',
  font: 'style',
  palette: {
    primary: 'color',
    secondary: 'color'
  }
};

const themeDefaults: ThemeSettings = {
  // Values to be multiplied by a provided integer.
  space: 5,
  outline: 1,
  // A list of styles with any CSS properties.
  font: [
    { fontFamily: 'monospace', fontSize: '30px' },
    { fontFamily: 'sans-serif', fontSize: '21px' }
  ],
  palette: {
    // A function to return a HSLA value as [number, number, number, number?].
    primary: i => [180, 70, i * 5, 1],
    secondary: i => [60, 70, i * 5, 1]
  }
};

const createTheme = createCreateTheme<ThemeSettings, Theme>(themeStructure, themeDefaults);

const Sandbox = (): ReactElement => {
  const theme: Theme = useMemo(() => {
    const themeExtensions = {
      outline: 3
    };
    const theme = createTheme(themeExtensions);
    return theme;
  }, []);

  return (
    <Fragment>
      <Global styles={{
        html: {
          margin: theme.space(4),
          backgroundColor: theme.palette.primary(1)
        },
        h1: {
          borderBottomWidth: theme.outline(1),
          borderBottomStyle: 'solid',
          borderBottomColor: theme.palette.primary(10),
          marginBottom: theme.space(2),
          paddingBottom: theme.space(2),
          ...theme.font(0),
          color: theme.palette.primary(16)
        },
        p: {
          ...theme.font(1),
          color: theme.palette.secondary(16)
        }
      }} />
      <h1>Arwes Framework</h1>
      <p>Futuristic Sci-Fi UI Web Framework</p>
    </Fragment>
  );
};

const root = createRoot(document.querySelector('#root') as HTMLElement);
root.render(<StrictMode><Sandbox /></StrictMode>);
