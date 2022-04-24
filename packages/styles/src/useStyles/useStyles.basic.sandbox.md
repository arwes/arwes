```tsx
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactNode, ReactElement, Fragment } from 'react';
import { render } from 'react-dom';
import { Styles, StylesCreator, useStyles } from '@arwes/styles';

interface CardProps {
  styles?: StylesCreator
  title: string
  children: ReactNode
}

const createCardBaseStyles: StylesCreator = () => ({
  root: {
    display: 'inline-block',
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

  const styles = useStyles([createCardBaseStyles, customStyles], null, []);

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
        Arwes styles useStyles hook with default styles
      </Card>
      <Card title='useStyles' styles={cardCustomStyles}>
        Arwes styles useStyles hook with custom styles
      </Card>
      <Card title='useStyles' styles={false}>
        Arwes styles useStyles hook with removed styles
      </Card>
    </Fragment>
  );
}

render(<Sandbox />, document.querySelector('#root'));
```
