import React, { Fragment, ReactElement, useEffect } from 'react';
import Head from 'next/head';
import { animate } from 'motion';
import { Animator } from '@arwes/animator';
import { Dots } from '@arwes/bgs';

const $$ = (selector: string): HTMLElement[] => Array.from(document.querySelectorAll(selector));

const PageIndex = (): ReactElement => {
  useEffect(() => {
    animate($$('.footer'), { opacity: [0, 1], y: [10, 0] });
    animate($$('.footer a:first-child'), { x: [10, 0] });
    animate($$('.footer a:last-child'), { x: [-10, 0] });
    animate($$('.bg img'), { opacity: [0, 1], rotate: [-45, 0] }, { delay: 0.1 });
    animate($$('.links'), { opacity: [0, 1], y: [30, 0] }, { delay: 0.2 });
    animate($$('.links .button:first-child'), { x: [10, 0] }, { delay: 0.2 });
    animate($$('.links .button:last-child'), { x: [-10, 0] }, { delay: 0.2 });
    animate($$('.main p'), { opacity: [0, 1], y: [20, 0] }, { delay: 0.3 });
    animate($$('.main h2'), { opacity: [0, 1], y: [10, 0] }, { delay: 0.4 });
    animate($$('.main h1'), { opacity: [0, 1], y: [-10, 0] }, { delay: 0.45 });
  }, []);

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
        {/* TODO: For next development environment. */}
        <meta property="og:image" content="https://next.arwes.dev/arwes.jpg" />
        <meta property="og:url" content="https://next.arwes.dev" />
        <meta property="og:type" content="website" />
        <meta name="twitter:image:alt" content="Arwes" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@arwesjs" />

        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
      </Head>
      <style>{`
        html { background-color: #171717; }
      `}</style>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap" />
      <div className='page'>
        <main className='main'>
          <h1 className='hidden'>
            <img
              src='/logo-horizontal-text.png'
              alt='Arwes'
            />
          </h1>

          <h2 className='hidden'>
            Futuristic Sci-Fi UI Web Framework
          </h2>

          <p className='hidden'>
            Work in progress of the next version
          </p>

          <nav className='links hidden'>
            <a className='button button--secondary' href='/play'>Play</a>
            <a className='button button--secondary' href='/perf'>Perf</a>
            <a className='button button--secondary' href='https://arwes.dev' target='main'>Main</a>
          </nav>
        </main>

        <footer className='footer hidden'>
          <a href='https://github.com/arwes/arwes' target='github'>GitHub</a>
          <a href='https://discord.gg/s5sbTkw' target='discord'>Discord</a>
          <a href='https://twitter.com/arwesjs' target='twitter'>Twitter</a>
        </footer>

        <div className='bg'>
          <img
            className='hidden'
            src='/assets/images/arwesLogoImage.svg'
          />
        </div>
        <Animator duration={{ enter: 0.75, exit: 0.75 }}>
          <Dots
            color='hsla(180, 29%, 72%, 0.04)'
            size={5}
            distance={30}
            originInverted
          />
        </Animator>
      </div>
    </Fragment>
  );
};

export default PageIndex;
