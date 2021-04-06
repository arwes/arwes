/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';

import { Layout } from './Layout';
import { Head } from './Head';
import { Header } from './Header';
import { Footer } from './Footer';
import { DesktopNavSecondary } from './DesktopNavSecondary';

const generateStyles = ({ breakpoints, palette }) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr auto'
  },
  container: {
    overflowY: 'auto',
    minHeight: 0 // Height overflow issue.
  },
  content: {
    padding: 10,

    [breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '75% 25%',
      gridTemplateRows: 'auto',
      margin: '0 auto',
      padding: 20,
      maxWidth: 1200
    }
  },
  article: {
    [breakpoints.up('md')]: {
      borderRight: '1px solid' + palette.primary.main,
      paddingRight: 20
    }
  },
  desktopNavSecondary: {
    display: 'none',
    overflowY: 'auto',

    [breakpoints.up('md')]: {
      display: 'block',
      paddingLeft: 20
    }
  }
});

const PageContentLayout = ({ headProps, styles: pageStyles, children, location }) => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <Layout styles={pageStyles}>
      <Head {...headProps} />
      <div css={styles.root}>
        <Header />
        <div css={styles.container}>
          <div css={styles.content}>
            <main css={styles.article}>
              {children}
            </main>
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
  styles: PropTypes.object,
  location: PropTypes.object,
  children: PropTypes.any
};

export { PageContentLayout };
