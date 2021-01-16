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
  logo: theme => ({
    display: 'inline-block',
    margin: '3px 5px 0 0',
    height: 25,
    verticalAlign: 'top',

    [theme.breakpoints.tabletUp]: {
      margin: '0 10px 0 0',
      height: 30
    }
  }),
  title: theme => ({
    display: 'inline-block',
    margin: 0,
    lineHeight: '30px',
    fontSize: 20,
    verticalAlign: 'top',

    [theme.breakpoints.tabletUp]: {
      fontSize: 30
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
      <div>
        <Link to='/'>
          <img css={styles.logo} src='/logo-mini.jpg' alt='Arwes Logo' />
          <h1 css={styles.title}>ARWES</h1>
        </Link>
      </div>
      <DesktopNavPrimary css={styles.desktopNav} />
      <MobileNav css={styles.mobileNav} />
    </div>
  </header>
);

export { Header };
