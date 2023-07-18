import React, { type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Global } from '@emotion/react';
import {
  type ThemeSettingsUnit,
  type ThemeUnit,
  type AppThemeSettingsPalette,
  type AppThemeSettings,
  type AppThemePalette,
  type AppTheme,
  APP_THEME_STRUCTURE_PALETTE,
  createAppThemePalette,
  createAppTheme
} from '@arwes/theme';

// Settings Extension

type AppThemeSettingsColors = AppThemeSettings['colors'];
interface AppTheme2SettingsColors extends AppThemeSettingsColors {
  complementary: AppThemeSettingsPalette
}
interface AppTheme2Settings extends Omit<AppThemeSettings, 'colors'> {
  radius: ThemeSettingsUnit
  colors: AppTheme2SettingsColors
}

// Theme Extension

type AppThemeColors = AppTheme['colors'];
interface AppTheme2Colors extends AppThemeColors {
  complementary: AppThemePalette
}
interface AppTheme2 extends Omit<AppTheme, 'colors'> {
  radius: ThemeUnit
  colors: AppTheme2Colors
}

// Theme Creation

const t = createAppTheme<AppTheme2Settings, AppTheme2>({
  structure: {
    radius: 'unit',
    colors: {
      complementary: APP_THEME_STRUCTURE_PALETTE
    }
  },
  settings: {
    radius: (i: number) => `${0.5 * i}rem`,
    colors: {
      complementary: createAppThemePalette(330)
    }
  }
});

const Sandbox = (): ReactElement => {
  return (
    <Fragment>
      <Global styles={{
        html: {
          margin: t.space(2),
          lineHeight: 1.6,
          backgroundColor: t.colors.primary.ol(1)
        },
        h1: {
          ...t.typography.title(0),
          margin: t.space([0, 0, 4]),
          color: t.colors.primary.text(4),
          background: `-webkit-linear-gradient(
            0deg,
            ${t.colors.primary.main(4)},
            ${t.colors.complementary.main(4)}
          )`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        },
        hr: {
          margin: t.space([0, 0, 4]),
          border: 'none',
          height: 2,
          background: `linear-gradient(
            90deg,
            ${t.colors.primary.deco(5)},
            ${t.colors.complementary.deco(10)}
          )`
        },
        p: {
          margin: t.space([0, 0, 4]),
          ...t.typography.body(1),
          color: t.colors.primary.text(4)
        },
        img: {
          margin: 0,
          maxWidth: '100%',
          borderRadius: t.space(2)
        }
      }} />

      <main style={{
        border: `1px solid ${t.colors.primary.deco(5)}`,
        padding: t.space([4, 8]),
        maxWidth: 400,
        borderRadius: t.space(4),
        background: `linear-gradient(
          to bottom right,
          ${t.colors.primary.ol(2)},
          ${t.colors.primary.ol(4)}
        )`
      }}>
        <h1>Arwes Framework</h1>
        <hr />
        <p>
          Arwes is a web framework to build user interfaces based on futuristic
          science fiction designs, animations, and sound effects. The concepts
          behind are opinionated with influences from Cyberprep and Synthwave,
          and productions like Star Citizen, Halo, and TRON: Legacy. It tries to
          inspire advanced science and technology.
        </p>
        <img src="/assets/images/background-large.jpg" />
      </main>
    </Fragment>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
