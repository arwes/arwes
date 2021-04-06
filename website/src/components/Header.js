/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import { Link } from 'gatsby';

import { DesktopNavPrimary } from './DesktopNavPrimary';
import { MobileNav } from './MobileNav';

const generateStyles = ({ breakpoints, palette }) => ({
  root: {
    borderBottom: `1px solid ${palette.primary.main}`,
    backgroundColor: palette.neutral.elevate(1)
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: 10,
    width: '100%',
    maxWidth: 1200,
    lineHeight: '30px',

    [breakpoints.up('md')]: {
      padding: 20
    }
  },
  logoItem: {
    display: 'inline-block',
    verticalAlign: 'top',
    margin: 0
  },
  logo: {
    display: 'block',
    marginTop: 5,

    [breakpoints.up('md')]: {
      marginTop: 0
    }
  },
  logoType: {
    marginRight: 5,
    height: 25,

    [breakpoints.up('md')]: {
      marginRight: 8,
      height: 30
    }
  },
  logoText: {
    marginTop: 3,
    height: 20,

    [breakpoints.up('md')]: {
      marginTop: 3,
      height: 25
    }
  },
  desktopNav: {
    [breakpoints.down('md')]: {
      display: 'none'
    }
  },
  mobileNav: {
    [breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

const Header = () => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
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
};

export { Header };
