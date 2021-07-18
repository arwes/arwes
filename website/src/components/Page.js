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
    gridTemplateRows: 'auto 1fr',
    backgroundColor: palette.neutral.elevate(1),
    backgroundImage: `radial-gradient(circle, ${palette.neutral.elevate(2)} 0%, ${palette.neutral.elevate(1)} 50%, ${palette.neutral.elevate(0)} 100%)`
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0, // Height overflow issue.

    [breakpoints.down('md')]: {
      overflowY: 'auto'
    }
  },
  containerSecondary: {
    flex: 1,

    [breakpoints.up('md')]: {
      overflowY: 'auto',
      minHeight: 0 // Height overflow issue.
    }
  },
  content: {
    padding: '1rem',

    [breakpoints.up('md')]: {
      display: 'grid',
      gridTemplateColumns: '75% 25%',
      gridTemplateRows: 'auto',
      margin: '0 auto',
      padding: '1.5rem',
      maxWidth: 1200
    }
  },
  article: {
    [breakpoints.up('md')]: {
      borderRight: '1px solid' + palette.primary.main,
      paddingRight: '1.25rem'
    }
  },
  menu: {
    display: 'none',

    [breakpoints.up('md')]: {
      display: 'block',
      paddingLeft: '1.25rem'
    }
  },
  desktopNavSecondary: {
    position: 'sticky',
    top: 0,
    padding: '1rem 0',
    maxHeight: 'calc(100vh - calc(1rem * 11))', // The calculated size without the header/footer/paddings.
    overflowY: 'auto'
  }
});

const Page = props => {
  const {
    containerCSS,
    headProps,
    styles: pageStyles,
    location,
    isContent,
    children
  } = props;

  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <Layout styles={pageStyles}>
      <Head {...headProps} />
      <div css={styles.root}>
        <Header />
        <div css={styles.container}>
          <div css={[styles.containerSecondary, containerCSS]}>
            {isContent && (
              <div css={styles.content}>
                <main css={styles.article}>
                  {children}
                </main>
                <div css={styles.menu}>
                  <DesktopNavSecondary
                    css={styles.desktopNavSecondary}
                    location={location}
                  />
                </div>
              </div>
            )}
            {!isContent && children}
          </div>
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

Page.propTypes = {
  containerCSS: PropTypes.object,
  headProps: PropTypes.object,
  styles: PropTypes.object,
  location: PropTypes.object,
  isContent: PropTypes.bool,
  children: PropTypes.any
};

Page.defaultProps = {
  isContent: true
};

export { Page };
