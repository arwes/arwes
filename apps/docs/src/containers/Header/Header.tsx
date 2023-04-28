import { type ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Page, Codepen, CollageFrame, DashboardSpeed, GitHub, Discord, Twitter } from 'iconoir-react';

import { type HeaderLayoutProps, HeaderLayout, Logo, Menu, MenuItem } from '../../ui';
import { Version } from '../Version';
import * as classes from './Header.css';

interface HeaderProps extends HeaderLayoutProps {}

const Header = (props: HeaderProps): ReactElement => {
  const router = useRouter();

  // The pages where the page content elements are floating instead
  // of being container by containers.
  const isFloatingRoutePath = router.asPath === '/';

  return (
    <HeaderLayout
      {...props}
      hasFrame={!isFloatingRoutePath}
      left={
        <>
          <Logo withLogotype={!isFloatingRoutePath} />
          {!isFloatingRoutePath && (
            <Menu>
              <MenuItem className={classes.menuItem} active={router.asPath.startsWith('/docs')}>
                <Link href='/docs' title='Go to Documentation'>
                  <Page />
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem} active={router.asPath.startsWith('/samples')}>
                <Link href='/samples' title='Go to Samples'>
                  <CollageFrame />
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <a href='/play' title='Go to Playground'>
                  <Codepen />
                </a>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <a href='/perf' title='Go to Performance'>
                  <DashboardSpeed />
                </a>
              </MenuItem>
            </Menu>
          )}
        </>
      }
      center={
        <>
          {router.asPath.startsWith('/docs') && (
            <Menu>
              <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/project')}>
                <Link href="/docs/project">Project</Link>
              </MenuItem>
              <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/design')}>
                <Link href="/docs/design">Design</Link>
              </MenuItem>
              <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/develop')}>
                <Link href="/docs/develop">Develop</Link>
              </MenuItem>
              <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/community')}>
                <Link href="/docs/community">Community</Link>
              </MenuItem>
            </Menu>
          )}
        </>
      }
      right={
        <>
          <Version />
          <Menu>
            <MenuItem className={classes.menuItem}>
              <a href='https://github.com/arwes/arwes' target='github' title='GitHub'>
                <GitHub />
              </a>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <a href='https://discord.gg/s5sbTkw' target='discord' title='Discord'>
                <Discord />
              </a>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <a href='https://twitter.com/arwesjs' target='twitter' title='Twitter'>
                <Twitter />
              </a>
            </MenuItem>
          </Menu>
        </>
      }
    />
  );
};

export type { HeaderProps };
export { Header };
