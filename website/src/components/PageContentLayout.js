/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';

import { Layout } from './Layout';
import { Head } from './Head';
import { Header } from './Header';
import { Footer } from './Footer';
import { DesktopNavSecondary } from './DesktopNavSecondary';

const styles = {
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr auto',
    height: '100vh'
  },
  container: {
    overflowY: 'auto',
    minHeight: 0 // Height overflow issue.
  },
  content: theme => ({
    padding: 10,

    [theme.breakpoints.tabletUp]: {
      display: 'grid',
      gridTemplateColumns: '75% 25%',
      gridTemplateRows: 'auto',
      margin: '0 auto',
      padding: 20,
      maxWidth: 1200
    }
  }),
  article: theme => ({
    [theme.breakpoints.tabletUp]: {
      paddingRight: 15
    }
  }),
  desktopNavSecondary: theme => ({
    display: 'none',
    overflowY: 'auto',

    [theme.breakpoints.tabletUp]: {
      display: 'block',
      paddingLeft: 15
    }
  })
};

const PageContentLayout = ({ headProps, children, location }) => {
  return (
    <Layout>
      <Head {...headProps} />
      <div css={styles.root}>
        <Header />
        <div css={styles.container}>
          <div css={styles.content}>
            <article css={styles.article}>
              {children}
            </article>
            <DesktopNavSecondary
              css={styles.desktopNavSecondary}
              location={location}
            />
          </div>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

PageContentLayout.propTypes = {
  headProps: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.any
};

export { PageContentLayout };
