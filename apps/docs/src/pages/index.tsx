import { type ReactElement } from 'react';
import Link from 'next/link';
import { Animator, Animated, aaOpacity, aa } from '@arwes/react';
import { Button, SocialMedia, Version } from '../ui';

const PageIndex = (): ReactElement => {
  return (
    <Animator combine>
      <header className='header'>
        <Animator>
          <Animated
            className='header__logo'
            animated={[aaOpacity(), aa('x', -10, 0)]}
          >
            <a className='header__logo-link' href='/'>
              <img
                className='header__logo-img'
                src='/logo.png'
                role='presentation'
              />
            </a>
          </Animated>
        </Animator>

        <div className='header__controls'>
          <Version />
          <Animator>
            <SocialMedia
              animated={[aaOpacity(), aa('x', 10, 0)]}
            />
          </Animator>
        </div>
      </header>

      <main className='main'>
        <div className='main__content'>
          <Animator>
            <Animated as='h1' animated={[aaOpacity(), aa('y', 10, 0)]}>
              <img
                src='/logotype.png'
                alt='Arwes'
              />
            </Animated>
          </Animator>

          <Animator>
            <Animated as='h2' animated={[aaOpacity(), aa('y', 20, 0)]}>
              Futuristic Sci-Fi UI Web Framework
            </Animated>
          </Animator>

          <Animator>
            <Animated
              as='nav'
              className='links'
              animated={[aa('y', 30, 0)]}
            >
              <Link href='/docs'>
                <Button animated={aa('x', 20, 0)}>
                  Docs
                </Button>
              </Link>
              <a href='/play'>
                <Button>
                  Play
                </Button>
              </a>
              <a href='/perf'>
                <Button animated={aa('x', -20, 0)}>
                  Perf
                </Button>
              </a>
            </Animated>
          </Animator>
        </div>
      </main>
    </Animator>
  );
};

export default PageIndex;
