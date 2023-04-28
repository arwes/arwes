import { type ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Page, Codepen, CollageFrame, DashboardSpeed, GitHub, Discord, Twitter, RemoveKeyframes, SoundOff } from 'iconoir-react';

import { hiddenLGDown, hiddenXLDown } from '@app/styles';
import { type HeaderLayoutProps, HeaderLayout, Logo, Menu, MenuItem } from '@app/ui';
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
                  <Page /> <span className={hiddenXLDown}>Docs</span>
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem} active={router.asPath.startsWith('/samples')}>
                <Link href='/samples' title='Go to Samples'>
                  <CollageFrame /> <span className={hiddenXLDown}>Samples</span>
                </Link>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <a href='/play' title='Go to Playground'>
                  <Codepen /> <span className={hiddenXLDown}>Play</span>
                </a>
              </MenuItem>
              <MenuItem className={classes.menuItem}>
                <a href='/perf' title='Go to Performance'>
                  <DashboardSpeed /> <span className={hiddenXLDown}>Perf</span>
                </a>
              </MenuItem>
            </Menu>
          )}
        </>
      }
      center={
        <>
          {router.asPath.startsWith('/docs') && (
            <Menu className={hiddenLGDown}>
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
          <Version className={hiddenLGDown} />
          <Menu className={hiddenLGDown}>
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
          <Menu>
            <MenuItem className={classes.menuItem}>
              <button className={classes.button} title='Enable motion'>
                <RemoveKeyframes />
              </button>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <button className={classes.button} title='Enable audio'>
                <SoundOff />
              </button>
            </MenuItem>
          </Menu>
        </>
      }
    />
  );
};

export type { HeaderProps };
export { Header };
