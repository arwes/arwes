import { type ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAtom } from 'jotai';
import {
  Page,
  Codepen,
  CollageFrame,
  DashboardSpeed,
  GitHub,
  Discord,
  Twitter,
  Keyframes,
  RemoveKeyframes,
  SoundHigh,
  SoundOff,
  Menu as MenuIcon
} from 'iconoir-react';
import { cx, Animator, aa, aaVisibility, aaOpacity } from '@arwes/react';

import { atomMotion, atomAudio } from '@app/utils';
import { hiddenLG, hiddenSMDown, hiddenLGDown, hiddenXLDown } from '@app/styles';
import { type HeaderLayoutProps, HeaderLayout, Logo, LogoType, Menu, MenuItem } from '@app/ui';
import { Version } from '../Version';
import * as classes from './Header.css';

interface HeaderProps extends HeaderLayoutProps {}

const Header = (props: HeaderProps): ReactElement => {
  const router = useRouter();
  const [motion, setMotion] = useAtom(atomMotion);
  const [audio, setAudio] = useAtom(atomAudio);

  // The pages where the page content elements are floating instead
  // of being container by containers.
  const isFloatingRoutePath = router.asPath === '/';

  const leftItemAnimation = isFloatingRoutePath ? aaOpacity() : [aaVisibility(), aa('x', -4, 0, 0)];
  const rightItemAnimation = isFloatingRoutePath ? aaOpacity() : [aaVisibility(), aa('x', 4, 0, 0)];

  return (
    <HeaderLayout
      {...props}
      hasFrame={!isFloatingRoutePath}
      left={
        <Animator combine manager='stagger'>
          <Animator>
            <Logo animated={aaVisibility()}>
              {!isFloatingRoutePath && (
                <Animator merge>
                  <LogoType
                    className={hiddenSMDown}
                    animated={leftItemAnimation}
                  />
                </Animator>
              )}
            </Logo>
          </Animator>
          {!isFloatingRoutePath && (
            <Animator combine manager='stagger' duration={{ stagger: 0.03 }}>
              <Menu>
                <Animator>
                  <MenuItem
                    className={classes.menuItem}
                    active={router.asPath.startsWith('/docs')}
                    animated={leftItemAnimation}
                  >
                    <Link href='/docs' title='Go to Documentation'>
                      <Page /> <span className={hiddenXLDown}>Docs</span>
                    </Link>
                  </MenuItem>
                </Animator>
                <Animator>
                  <MenuItem
                    className={classes.menuItem}
                    active={router.asPath.startsWith('/samples')}
                    animated={leftItemAnimation}
                  >
                    <Link href='/samples' title='Go to Samples'>
                      <CollageFrame /> <span className={hiddenXLDown}>Samples</span>
                    </Link>
                  </MenuItem>
                </Animator>
                <Animator>
                  <MenuItem
                    className={classes.menuItem}
                    animated={leftItemAnimation}
                  >
                    <a href='/play' title='Go to Playground'>
                      <Codepen /> <span className={hiddenXLDown}>Play</span>
                    </a>
                  </MenuItem>
                </Animator>
                <Animator>
                  <MenuItem
                    className={classes.menuItem}
                    animated={leftItemAnimation}
                  >
                    <a href='/perf' title='Go to Performance'>
                      <DashboardSpeed /> <span className={hiddenXLDown}>Perf</span>
                    </a>
                  </MenuItem>
                </Animator>
              </Menu>
            </Animator>
          )}
        </Animator>
      }
      center={
        <>
          {router.asPath.startsWith('/docs') && (
            <Animator>
              <Menu className={hiddenLGDown} animated={aaVisibility()}>
                <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/develop')}>
                  <Link href="/docs/develop">Develop</Link>
                </MenuItem>
                <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/design')}>
                  <Link href="/docs/design">Design</Link>
                </MenuItem>
                <MenuItem className={classes.menuItem} active={router.asPath.includes('/docs/community')}>
                  <Link href="/docs/community">Community</Link>
                </MenuItem>
              </Menu>
            </Animator>
          )}
        </>
      }
      right={
        <Animator
          combine
          manager={isFloatingRoutePath ? 'parallel' : 'staggerReverse'}
          duration={{ stagger: 0.03 }}
        >
          <Animator>
            <Version className={hiddenLGDown} animated={rightItemAnimation} />
          </Animator>
          <Menu className={hiddenLGDown}>
            <Animator>
              <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                <a href='https://github.com/arwes/arwes' target='github' title='Go to GitHub'>
                  <GitHub />
                </a>
              </MenuItem>
            </Animator>
            <Animator>
              <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                <a href='https://discord.gg/s5sbTkw' target='discord' title='Go to Discord'>
                  <Discord />
                </a>
              </MenuItem>
            </Animator>
            <Animator>
              <MenuItem className={classes.menuItem} animated={rightItemAnimation}>
                <a href='https://twitter.com/arwesjs' target='twitter' title='Go to Twitter'>
                  <Twitter />
                </a>
              </MenuItem>
            </Animator>
          </Menu>
          <Menu>
            <Animator>
              <MenuItem className={cx(classes.menuItem, hiddenLGDown)} animated={rightItemAnimation}>
                <button
                  className={classes.button}
                  title={motion ? 'Disable motion' : 'Enable motion'}
                  onClick={() => setMotion(!motion)}
                >
                  {motion ? <Keyframes /> : <RemoveKeyframes />}
                </button>
              </MenuItem>
            </Animator>
            <Animator>
              <MenuItem className={cx(classes.menuItem, hiddenLGDown)} animated={rightItemAnimation}>
                <button
                  className={classes.button}
                  title={audio ? 'Disable audio' : 'Enable audio'}
                  onClick={() => setAudio(!audio)}
                >
                  {audio ? <SoundHigh /> : <SoundOff />}
                </button>
              </MenuItem>
            </Animator>
            <Animator>
              <MenuItem className={cx(classes.menuItem, hiddenLG)} animated={rightItemAnimation}>
                <button className={classes.button} title='Navigation and Settings'>
                  <MenuIcon />
                </button>
              </MenuItem>
            </Animator>
          </Menu>
        </Animator>
      }
    />
  );
};

export type { HeaderProps };
export { Header };
