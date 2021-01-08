/** @jsx jsx */
import { jsx } from '@emotion/react';

import lernaSettings from '../../../lerna.json';
import { Layout } from '../components/Layout';
import { Head } from '../components/Head';

const styles = {
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  main: {
    display: 'block',
    margin: 'auto',
    padding: 20,
    textAlign: 'center'
  },
  mainHeader: {
    '& h1': {
      margin: '0 0 10px',
      fontSize: 42
    },
    '& p': {
      margin: '0 0 10px',
      fontSize: 18
    }
  },
  mainNav: {
    '& a + a': {
      marginLeft: 10
    }
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  footerLeft: {},
  footerRight: {
    '& a + a': {
      marginLeft: 10
    }
  }
};

const IndexPage = () => (
  <Layout>
    <Head />
    <div css={styles.root}>
      <main css={styles.main}>
        <header css={styles.mainHeader}>
          <h1>Arwes</h1>
          <p>Futuristic Sci-Fi UI Web Framework</p>
          <p><small>Work in progress of the project latest version</small></p>
        </header>
        <nav css={styles.mainNav}>
          <a href='https://playground.arwes.dev' target='playground' rel='noreferrer'>Playground</a>
          <a href='https://version1-breakpoint1.arwes.dev' target='version1-breakpoint1' rel='noreferrer'>Previous Version</a>
        </nav>
      </main>
      <footer css={styles.footer}>
        <div css={styles.footerLeft}>
          <a href='https://github.com/arwes' target='github' rel='noreferrer'>v{lernaSettings.version}</a>
        </div>
        <div css={styles.footerRight}>
          <a href='https://discord.gg/s5sbTkw' target='discord' rel='noreferrer'>Discord</a>
          <a href='https://twitter.com/arwesjs' target='twitter' rel='noreferrer'>Twitter</a>
          <a href='https://github.com/arwes' target='github' rel='noreferrer'>GitHub</a>
        </div>
      </footer>
    </div>
  </Layout>
);

export default IndexPage;
