/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { Page } from '../components/Page';

const generateStyles = ({ breakpoints, palette }) => ({
  container: {
    display: 'flex'
  },
  main: {
    display: 'block',
    margin: 'auto',
    padding: '1rem',
    textAlign: 'center',

    h1: {
      margin: '0 auto 1rem'
    },
    img: {
      margin: 0,
      width: '100%',
      maxWidth: 160,
      verticalAlign: 'top'
    },
    p: {
      marginBottom: '1rem',
      fontSize: '1rem'
    },
    small: {
      color: palette.error.light1
    },

    [breakpoints.up('md')]: {
      h1: {
        margin: '0 auto 1.5rem'
      },
      img: {
        maxWidth: 220
      },
      p: {
        marginBottom: '1rem',
        fontSize: '1.25rem'
      }
    }
  }
});

const IndexPage = () => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <Page
      containerCSS={styles.container}
      isContent={false}
    >
      <main css={styles.main}>
        <header>
          <h1>
            <img src='/logo-vertical.png' alt='Arwes' />
          </h1>
          <p>Futuristic Sci-Fi UI Web Framework</p>
          <p><small><i>
            Work in progress of the project latest version.<br />
            Not ready for production yet.
          </i></small></p>
        </header>
      </main>
    </Page>
  );
};

export default IndexPage;
