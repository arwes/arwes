import React, { type ReactElement } from 'react';
import Link from 'next/link';
import { Animator } from '@arwes/react-animator';
import { Animated, aaOpacity, aaProperty } from '@arwes/react-animated';
import { Button } from '../ui/Button';
import lernaSettings from '@repository/lerna.json';

const PageIndex = (): ReactElement => {
  return (
    <Animator combine>
      <header className='header'>
        <Animator>
          <Animated
            className='header__logo'
            animated={[aaOpacity(), aaProperty('x', -10, 0)]}
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
          <a
            className='header__version'
            href={`https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`}
            target='version'
          >
            v{lernaSettings.version}
          </a>
          <Animator>
            <Animated
              as='nav'
              className='nav'
              animated={[aaOpacity(), aaProperty('x', 10, 0)]}
            >
              <a href='https://github.com/arwes/arwes' target='github'>
                GitHub
              </a>
              <a href='https://discord.gg/s5sbTkw' target='discord'>
                Discord
              </a>
              <a href='https://twitter.com/arwesjs' target='twitter'>
                Twitter
              </a>
            </Animated>
          </Animator>
        </div>
      </header>

      <main className='main'>
        <div className='main__content'>
          <Animator>
            <Animated as='h1' animated={[aaOpacity(), aaProperty('y', 10, 0)]}>
              <img
                src='/logotype.png'
                alt='Arwes'
              />
            </Animated>
          </Animator>

          <Animator>
            <Animated as='h2' animated={[aaOpacity(), aaProperty('y', 20, 0)]}>
              Futuristic Sci-Fi UI Web Framework
            </Animated>
          </Animator>

          <Animator>
            <Animated
              as='nav'
              className='links'
              animated={[aaProperty('y', 30, 0)]}
            >
              <Link href='/docs'>
                <Button variant='secondary' animated={aaProperty('x', 20, 0)}>
                  Docs
                </Button>
              </Link>
              <a href='/play'>
                <Button variant='secondary'>
                  Play
                </Button>
              </a>
              <a href='/perf'>
                <Button variant='secondary' animated={aaProperty('x', -20, 0)}>
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
