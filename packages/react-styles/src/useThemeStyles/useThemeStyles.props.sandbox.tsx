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
  styles?: StylesThemeCreator<CardProps>
  disabled?: boolean
  title: string
  children: ReactNode
}

const createCardBaseStyles: StylesThemeCreator<CardProps> = (theme, props) => ({
  root: {
    display: 'block',
    margin: theme.space,
    padding: theme.space,
    fontFamily: theme.fontFamily,
    color: theme.color,
    backgroundColor: theme.backgroundColor,
    opacity: props.disabled ? 0.5 : undefined
  },
  title: {
    margin: `0 0 ${theme.space}`
  },
  description: {
    margin: 0
  }
});

const Card = (props: CardProps): ReactElement => {
  const { styles: customStyles, disabled, title, children } = props;

  const styles = useThemeStyles<CardProps>(
    [createCardBaseStyles, customStyles],
    // Custom properties needed to create the styles.
    props,
    // Dependencies to check to recreate the styles.
    // It should not be the `props` object for performance reasons.
    [disabled]
  );

  return (
    <article css={styles.root}>
      <h1 css={styles.title}>
        {title} {disabled ? ' (Disabled)' : ''}
      </h1>
      <p css={styles.description}>
        {children}
      </p>
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

  const customThemeStyles: StylesThemeCreator<CardProps> = theme => ({
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
      <Card title='useThemeStyles' disabled>
        props customization
      </Card>
      <Card title='useThemeStyles' styles={false}>
        removed styles
      </Card>
    </ThemeProvider>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
