import { type ReactElement } from 'react';
import Link from 'next/link';
import { Page, Codepen, CollageFrame, DashboardSpeed } from 'iconoir-react';
import { Animator, Animated, aaVisibility, aa, BleepsOnAnimator } from '@arwes/react';
import type { BleepNames } from '@app/types';
import { Button } from '@app/ui';
import { hiddenSMDown } from '@app/styles';

const PageIndex = (): ReactElement => {
  return (
    <>
      <style jsx global>{`
        .page {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .container {
          display: grid;
          row-gap: 1rem;
          padding: 1rem;
        }

        .title {
          display: flex;
          justify-content: center;
          margin: 0;
        }

        .logo {
          margin: 0;
          max-height: 2.5rem;
        }

        .subtitle {
          display: flex;
          justify-content: center;
          margin: 0;
          font-size: 1rem;
        }

        .nav {
          display: grid;
          grid-auto-flow: column;
          column-gap: 0.5rem;
        }

        .nav-item,
        .nav-item a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 768px) {
          .container {
            row-gap: 1.25rem;
          }

          .logo {
            max-height: 3.75rem;
          }

          .subtitle {
            font-size: 1.5rem;
          }

          .nav {
            column-gap: 1rem;
          }
        }
      `}</style>

      <Animator combine manager='sequenceReverse'>
        <BleepsOnAnimator<BleepNames> transitions={{ entering: 'intro' }} continuous />

        <main className='page'>
          <Animated className='container' animated={aa('y', 12, 0)}>
            <Animator>
              <Animated as='h1' className='title' animated={[aaVisibility()]}>
                <img
                  role='heading'
                  className='logo'
                  src='/logotype.png'
                  alt='Arwes Project'
                  title='Arwes Project'
                />
              </Animated>
            </Animator>

            <Animator>
              <Animated as='h2' className='subtitle' animated={[aaVisibility(), aa('scaleX', 1, 1)]}>
                Futuristic Sci-Fi UI Web Framework
              </Animated>
            </Animator>

            <Animator>
              <nav className='nav'>
                <Animated className='nav-item' animated={[aaVisibility(), aa('x', -24, 0)]}>
                  <Link href='/docs'>
                    <Button size='small' tabIndex={-1} title='Go to Documentation'>
                      <Page className={hiddenSMDown} />
                      <span>Docs</span>
                    </Button>
                  </Link>
                </Animated>
                <Animated className='nav-item' animated={[aaVisibility(), aa('x', -12, 0)]}>
                  <Link href='/samples'>
                    <Button size='small' tabIndex={-1} title='Go to Samples'>
                      <CollageFrame className={hiddenSMDown} />
                      <span>Samples</span>
                    </Button>
                  </Link>
                </Animated>
                <Animated className='nav-item' animated={[aaVisibility(), aa('x', 12, 0)]}>
                  <a href='/play'>
                    <Button size='small' tabIndex={-1} title='Go to Playground'>
                      <Codepen className={hiddenSMDown} />
                      <span>Play</span>
                    </Button>
                  </a>
                </Animated>
                <Animated className='nav-item' animated={[aaVisibility(), aa('x', 24, 0)]}>
                  <a href='/perf'>
                    <Button size='small' tabIndex={-1} title='Go to Performance'>
                      <DashboardSpeed className={hiddenSMDown} />
                      <span>Perf</span>
                    </Button>
                  </a>
                </Animated>
              </nav>
            </Animator>
          </Animated>
        </main>
      </Animator>
    </>
  );
};

export default PageIndex;
