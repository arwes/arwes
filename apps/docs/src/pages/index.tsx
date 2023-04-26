import { type ReactElement } from 'react';
import Link from 'next/link';
import { Animator, Animated } from '@arwes/react';
import { Page, Codepen, CollageFrame, DashboardSpeed } from 'iconoir-react';
import { Button, SocialMedia, Version, Header, Logo } from '../ui';

const PageIndex = (): ReactElement => {
  return (
    <Animator combine>
      <Header
        left={<Logo />}
        right={
          <>
            <Version />
            <SocialMedia />
          </>
        }
      />

      <main className='main'>
        <div className='main__content'>
          <Animator>
            <Animated as='h1'>
              <img
                src='/logotype.png'
                alt='Arwes'
              />
            </Animated>
          </Animator>

          <Animator>
            <Animated as='h2'>
              Futuristic Sci-Fi UI Web Framework
            </Animated>
          </Animator>

          <Animator>
            <Animated
              as='nav'
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                columnGap: 16,
                justifyContent: 'center'
              }}
            >
              <Link href='/docs'>
                <Button size='small' tabIndex={-1}>
                  <Page /> Docs
                </Button>
              </Link>
              <Link href='/samples'>
                <Button size='small' tabIndex={-1}>
                  <CollageFrame /> Samples
                </Button>
              </Link>
              <Link href='/play'>
                <Button size='small' tabIndex={-1}>
                  <Codepen /> Play
                </Button>
              </Link>
              <Link href='/perf'>
                <Button size='small' tabIndex={-1}>
                  <DashboardSpeed /> Perf
                </Button>
              </Link>
            </Animated>
          </Animator>
        </div>
      </main>
    </Animator>
  );
};

export default PageIndex;
