/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Layout } from '../components/Layout';
import { Head } from '../components/Head';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const styles = {
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'block',
    margin: 'auto',
    padding: 20,
    textAlign: 'center'
  },
  mainHeader: theme => ({
    '& img': {
      margin: '0 auto 15px',
      width: '100%',
      maxWidth: 160
    },
    '& h1': {
      margin: '0 0 25px',
      fontSize: 42
    },
    '& p': {
      margin: '0 0 10px',
      fontSize: 18
    },

    [theme.breakpoints.tabletUp]: {
      '& img': {
        maxWidth: 180
      }
    }
  }),
  mainNav: {
    '& a + a': {
      marginLeft: 10
    }
  }
};

const IndexPage = () => (
  <Layout>
    <Head />
    <div css={styles.root}>
      <Header />
      <main css={styles.main}>
        <header css={styles.mainHeader}>
          <img src='/logo-vertical.png' alt="Arwes's Logo Vertical" />
          <p>Futuristic Sci-Fi UI Web Framework</p>
          <p><small>Work in progress of the project latest version</small></p>
        </header>
        <nav css={styles.mainNav}>
          <a href='https://playground.arwes.dev' target='playground'>Playground</a>
          <a href='https://version1-breakpoint1.arwes.dev' target='version1-breakpoint1'>Previous Version</a>
        </nav>
      </main>
      <Footer />
    </div>
  </Layout>
);

export default IndexPage;
