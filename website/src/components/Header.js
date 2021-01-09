/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Link } from 'gatsby';

import { DesktopNavPrimary } from './DesktopNavPrimary';
import { MobileNav } from './MobileNav';

const styles = {
  root: theme => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.color.border}`,
    padding: 10,
    lineHeight: '30px',
    backgroundColor: theme.color.section
  }),
  title: {
    margin: 0,
    lineHeight: '30px',
    fontSize: 20
  },
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
    <div>
      <Link to='/'>
        <h1 css={styles.title}>Arwes</h1>
      </Link>
    </div>
    <DesktopNavPrimary css={styles.desktopNav} />
    <MobileNav css={styles.mobileNav} />
  </header>
);

export { Header };
