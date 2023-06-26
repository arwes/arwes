/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { type ReactNode, type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { type Styles, type StylesCreator, useStyles } from '@arwes/react-styles';

interface CardProps {
  styles?: StylesCreator<CardProps>
  disabled?: boolean
  title: string
  children: ReactNode
}

const createCardBaseStyles: StylesCreator<CardProps> = props => ({
  root: {
    display: 'block',
    margin: 20,
    padding: 20,
    fontFamily: 'monospace',
    color: '#0ff',
    backgroundColor: '#333',
    opacity: props.disabled ? 0.5 : undefined
  },
  title: {
    margin: '0 0 20px'
  },
  description: {
    margin: 0
  }
});

const Card = (props: CardProps): ReactElement => {
  const { styles: customStyles, disabled, title, children } = props;

  const styles = useStyles(
    [createCardBaseStyles, customStyles],
    props,
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
  const customPlainStyles: Styles = {
    root: {
      fontFamily: 'sans-serif',
      color: '#ff0'
    },
    title: {
      textShadow: '0 0 2px #ff0'
    }
  };

  const customFunctionStyles: StylesCreator<CardProps> = () => ({
    root: {
      color: '#333',
      backgroundColor: '#0ff'
    },
    title: {
      textShadow: '0 0 2px #333'
    }
  });

  return (
    <Fragment>
      <Card title='useStyles'>
        default styles
      </Card>
      <Card title='useStyles' styles={customPlainStyles}>
        custom plain styles
      </Card>
      <Card title='useStyles' styles={customFunctionStyles}>
        custom function styles
      </Card>
      <Card title='useStyles' disabled>
        props customization
      </Card>
      <Card title='useStyles' styles={false}>
        removed styles
      </Card>
    </Fragment>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
