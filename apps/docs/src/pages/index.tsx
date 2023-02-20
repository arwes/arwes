import React, { Fragment, type ReactElement } from 'react';
import Head from 'next/head';
import { Animator } from '@arwes/react-animator';
import { Animated, aaOpacity, aaProperty } from '@arwes/react-animated';
import { Dots, Puffs } from '@arwes/react-bgs';
import { Button } from '../ui/Button';
import lernaSettings from '@repository/lerna.json';

const PageIndex = (): ReactElement => {
  return (
    <Fragment>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Arwes</title>
        <meta name="description" content="Futuristic Sci-Fi UI Web Framework." />
        <meta property="og:title" content="Arwes" />
        <meta property="og:site_name" content="Arwes" />
        <meta property="og:description" content="Futuristic Sci-Fi UI Web Framework." />
        <meta property="og:image" content="https://next.arwes.dev/arwes.jpg" />
        <meta property="og:url" content="https://next.arwes.dev" />
        <meta property="og:type" content="website" />
        <meta name="twitter:image:alt" content="Arwes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@arwesjs" />

        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>

      <style>{`
        html { background-color: #050b0b; }
      `}</style>

      <div className='page'>
        <Animator combine manager='staggerReverse'>
          <div className='page__content'>
            <header className='header'>
              <Animator>
                <Animated
                  className='header__logo'
                  animated={[aaOpacity(), aaProperty('x', -10, 0)]}
                >
                  <a
                    className='header__logo-link'
                    href='/'
                  >
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
                    <a
                      href='https://github.com/arwes/arwes'
                      target='github'
                    >
                      GitHub
                    </a>
                    <a
                      href='https://discord.gg/s5sbTkw'
                      target='discord'
                    >
                      Discord
                    </a>
                    <a
                      href='https://twitter.com/arwesjs'
                      target='twitter'
                    >
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
                    <Animated
                      as='a'
                      href='/docs'
                      animated={aaProperty('x', 20, 0)}
                    >
                      <Button variant='secondary'>
                        Docs
                      </Button>
                    </Animated>
                    <a
                      href='/play'
                    >
                      <Button variant='secondary'>
                        Play
                      </Button>
                    </a>
                    <Animated
                      as='a'
                      href='/perf'
                      animated={aaProperty('x', -20, 0)}
                    >
                      <Button variant='secondary'>
                        Perf
                      </Button>
                    </Animated>
                  </Animated>
                </Animator>
              </div>
            </main>
          </div>
        </Animator>

        <Animator duration={{ enter: 2, interval: 4 }}>
          <Puffs
            color='hsla(180, 29%, 72%, 0.25)'
            quantity={20}
          />
        </Animator>

        <Animator duration={{ enter: 2 }}>
          <Dots
            color='hsla(180, 29%, 72%, 0.25)'
            size={2}
            distance={60}
            originInverted
          />
        </Animator>

        <Animator>
          <Animated
            as='picture'
            className="bg"
            animated={[aaProperty('opacity', 0.8, 1), aaProperty('scale', 1.025, 1)]}
          >
            <source media='(min-width:1280px)' srcSet='/assets/images/background-large.webp' type='image/webp' />
            <source media='(min-width:1280px)' srcSet='/assets/images/background-large.jpg' type='image/jpeg' />
            <source media='(min-width:768px)' srcSet='/assets/images/background-medium.webp' type='image/webp' />
            <source media='(min-width:768px)' srcSet='/assets/images/background-medium.jpg' type='image/jpeg' />
            <source media='(max-width:767px)' srcSet='/assets/images/background-small.webp' type='image/webp' />
            <img src='/assets/images/background-small.jpg' role='presentation' alt='Background' />
          </Animated>
        </Animator>
      </div>
    </Fragment>
  );
};

export default PageIndex;
