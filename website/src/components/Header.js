/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

import { DesktopNavPrimary } from './DesktopNavPrimary';
import { MobileNav } from './MobileNav';

const styles = {
  root: theme => ({
    borderBottom: `1px solid ${theme.color.border}`,
    backgroundColor: theme.color.section
  }),
  container: theme => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: 10,
    width: '100%',
    maxWidth: 1200,
    lineHeight: '30px',

    [theme.breakpoints.tabletUp]: {
      padding: 20
    }
  }),
  logoItem: {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: 0
  },
  logo: theme => ({
    display: 'block',
    marginTop: 5,

    [theme.breakpoints.tabletUp]: {
      marginTop: 0
    }
  }),
  logoType: theme => ({
    marginRight: 5,
    height: 25,

    [theme.breakpoints.tabletUp]: {
      marginRight: 8,
      height: 30
    }
  }),
  logoText: theme => ({
    marginTop: 3,
    height: 20,

    [theme.breakpoints.tabletUp]: {
      marginTop: 3,
      height: 25
    }
  }),
  desktopNav: theme => ({
    [theme.breakpoints.tabletDown]: {
      display: 'none'
    }
  }),
  mobileNav: theme => ({
    [theme.breakpoints.tabletUp]: {
      display: 'none'
    }
  })
};

const Header = () => (
  <header css={styles.root}>
    <div css={styles.container}>
      <Link css={styles.logo} to='/'>
        <img css={[styles.logoItem, styles.logoType]} src='/logo.png' alt='Arwes Logotype' />
        <img css={[styles.logoItem, styles.logoText]} src='/logo-horizontal-text.png' alt='Arwes Logotext' />
      </Link>
      <DesktopNavPrimary css={styles.desktopNav} />
      <MobileNav css={styles.mobileNav} />
    </div>
  </header>
);

export { Header };
