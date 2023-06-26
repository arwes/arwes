/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';
import React, { type ReactNode, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { type Styles, type StylesThemeCreator, useThemeStyles } from '@arwes/react-styles';

// useThemeStyles uses the `useTheme` hook which returns a `Theme`.
// So the proper type should be set globally.
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}

interface AppTheme {
  space: string
  fontFamily: string
  color: string
  backgroundColor: string
}

interface CardProps {
  styles?: StylesThemeCreator
  title: string
  children: ReactNode
}

const cardBaseStyles: StylesThemeCreator = theme => ({
  root: {
    display: 'block',
    margin: theme.space,
    padding: theme.space,
    fontFamily: theme.fontFamily,
    color: theme.color,
    backgroundColor: theme.backgroundColor
  },
  title: {
    margin: `0 0 ${theme.space}`
  },
  description: {
    margin: 0
  }
});

const Card = (props: CardProps): ReactElement => {
  const { styles: customStyles, title, children } = props;

  const styles = useThemeStyles([cardBaseStyles, customStyles], undefined, []);

  return (
    <article css={styles.root}>
      <h1 css={styles.title}>{title}</h1>
      <p css={styles.description}>{children}</p>
    </article>
  );
};

const Sandbox = (): ReactElement => {
  const appTheme: AppTheme = {
    space: '20px',
    fontFamily: 'monospace',
    color: '#0ff',
    backgroundColor: '#333'
  };

  const customPlainStyles: Styles = {
    root: {
      fontFamily: 'sans-serif',
      color: '#ff0'
    },
    title: {
      textShadow: '0 0 2px #ff0'
    }
  };

  const customThemeStyles: StylesThemeCreator = theme => ({
    root: {
      color: theme.backgroundColor,
      backgroundColor: theme.color
    },
    title: {
      textShadow: `0 0 2px ${theme.backgroundColor}`
    }
  });

  return (
    <ThemeProvider theme={appTheme}>
      <Card title='useThemeStyles'>
        default styles
      </Card>
      <Card title='useThemeStyles' styles={customPlainStyles}>
        custom plain styles
      </Card>
      <Card title='useThemeStyles' styles={customThemeStyles}>
        custom theme styles
      </Card>
      <Card title='useThemeStyles' styles={false}>
        removed styles
      </Card>
    </ThemeProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
