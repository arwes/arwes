/** @jsx jsx */
import { jsx } from '@emotion/react';
import { type ReactNode, type ReactElement, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { type Styles, type StylesCreator, useStyles } from '@arwes/react-styles';

interface CardProps {
  styles?: StylesCreator
  title: string
  children: ReactNode
}

const createCardBaseStyles: StylesCreator = () => ({
  root: {
    display: 'block',
    margin: 20,
    padding: 20,
    fontFamily: 'monospace',
    color: '#0ff',
    backgroundColor: '#333'
  },
  title: {
    margin: '0 0 20px'
  },
  description: {
    margin: 0
  }
});

const Card = (props: CardProps): ReactElement => {
  const { styles: customStyles, title, children } = props;

  const styles = useStyles([createCardBaseStyles, customStyles], undefined, []);

  return (
    <article css={styles.root}>
      <h1 css={styles.title}>{title}</h1>
      <p css={styles.description}>{children}</p>
    </article>
  );
};

const Sandbox = (): ReactElement => {
  const cardCustomStyles: Styles = {
    root: {
      fontFamily: 'sans-serif',
      color: '#ff0'
    },
    title: {
      textShadow: '0 0 2px #ff0'
    }
  };

  return (
    <Fragment>
      <Card title='useStyles'>
        default styles
      </Card>
      <Card title='useStyles' styles={cardCustomStyles}>
        custom styles
      </Card>
      <Card title='useStyles' styles={false}>
        removed styles
      </Card>
    </Fragment>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
