/** @jsx jsx */
import { jsx, Global } from '@emotion/react';
import { type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import {
  type ThemeSettingsMultiplier,
  type ThemeSettingsColor,
  type ThemeSettingsStyle,
  type ThemeMultiplier,
  type ThemeColor,
  type ThemeStyle,
  type ThemeCreatorStructure
} from '@arwes/theme';
import {
  type ThemeSettingsExtend,
  type ThemeExtend,
  createUseCreateThemeExtended
} from '@arwes/react-theme';

interface ThemeSettings {
  space: ThemeSettingsMultiplier
  outline: ThemeSettingsMultiplier
  color: ThemeSettingsColor
  font: ThemeSettingsStyle
}

type ThemeSettingsExtended = ThemeSettingsExtend<ThemeSettings>;

interface Theme {
  space: ThemeMultiplier
  outline: ThemeMultiplier
  color: ThemeColor
  font: ThemeStyle
}

type ThemeExtended = ThemeExtend<Theme>;

const themeStructure: ThemeCreatorStructure = {
  space: 'multiplier',
  outline: 'multiplier',
  color: 'color',
  font: 'style'
};

const themeSettingsDefaults: ThemeSettings = {
  space: 0,
  outline: 0,
  color: () => [0, 0, 0, 0],
  font: []
};

// Make a React hook to create a new extended theme based on provided settings.
const useCreateThemeExtended = createUseCreateThemeExtended<ThemeSettings, Theme>(
  themeStructure,
  themeSettingsDefaults
);

const Sandbox = (): ReactElement => {
  const theme: ThemeExtended = useCreateThemeExtended(() => {
    const settings: ThemeSettingsExtended = {
      // Common or default settings.
      common: {
        space: 10,
        outline: 1,
        // Default color will be for dark color scheme.
        // Color function will have variations from 0 (darkest) to 20 (lightest).
        color: (i: number) => [180, 70, i * 5, 1],
        font: [
          { fontSize: '24px' },
          { fontSize: '16px' }
        ]
      },
      // Color scheme settings: 'dark' and 'light'.
      colorSchemes: {
        // Light color scheme.
        light: {
          // Color function will have variations from 0 (lightest) to 20 (darkest).
          color: (i: number) => [180, 70, 100 - i * 5, 1]
        }
      },
      // Specific media queries settings.
      medias: {
        '(min-width: 500px)': {
          space: 25,
          outline: 3
        },
        '(min-width: 1000px)': {
          space: 50,
          outline: 6
        }
      }
    };
    return settings;
  }, []);

  return (
    <div>
      <Global styles={{
        html: {
          margin: theme.space(1),
          background: theme.color(2)
        },
        p: {
          ...theme.font(0),
          borderBottom: `${theme.outline(1)}px solid ${theme.color(14)}`,
          margin: `0 0 ${theme.space(1)}px`,
          color: theme.color(18)
        },
        button: {
          ...theme.font(1)
        }
      }} />

      {/* Defines who has defined the current theme color scheme. */}
      <p>Current color scheme control: {theme.colorSchemeControl}</p>

      {/* Executed theme color scheme. */}
      <p>Current color scheme: {theme.colorScheme}</p>

      {/* Set always the theme color scheme as light. */}
      <button onClick={() => theme.setColorScheme('light')}>Set Light</button>
      {' '}

      {/* Set always the theme color scheme as dark. */}
      <button onClick={() => theme.setColorScheme('dark')}>Set Dark</button>
      {' '}

      {/* Set the theme color scheme as the system is configured. */}
      <button onClick={() => theme.setColorScheme(null)}>Set System</button>
    </div>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
