import './global.css';

import type { ReactElement } from 'react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Animator, AnimatorGeneralProvider, Animated, aa, Dots, Puffs } from '@arwes/react';

import { setupGoogleFonts } from '../utils/setupGoogleFonts';
import { setupGoogleAnalytics } from '../utils/setupGoogleAnalytics';

interface ClientAppProps extends AppProps {
  Component: NextPage
}

const ClientApp = (props: ClientAppProps): ReactElement => {
  const { Component, pageProps } = props;

  useEffect(() => {
    setupGoogleFonts();
    setupGoogleAnalytics();
  }, []);

  return (
    <ThemeProvider theme={{}}>
      <AnimatorGeneralProvider duration={{ enter: 0.2, exit: 0.2, stagger: 0.1 }}>
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

        <Animator combine>
          <div className='page'>
            <Animator>
              <Animated
                as='picture'
                className="background1"
                animated={[aa('opacity', 0.8, 1), aa('scale', 1.025, 1)]}
                role='presentation'
              >
                <source media='(min-width:1280px)' srcSet='/assets/images/background-large.webp' type='image/webp' />
                <source media='(min-width:1280px)' srcSet='/assets/images/background-large.jpg' type='image/jpeg' />
                <source media='(min-width:768px)' srcSet='/assets/images/background-medium.webp' type='image/webp' />
                <source media='(min-width:768px)' srcSet='/assets/images/background-medium.jpg' type='image/jpeg' />
                <source media='(max-width:767px)' srcSet='/assets/images/background-small.webp' type='image/webp' />
                <img src='/assets/images/background-small.jpg' role='presentation' alt='Background' />
              </Animated>
            </Animator>

            <Animator duration={{ enter: 2 }}>
              <Dots
                className="background2"
                color='hsla(180, 29%, 72%, 0.15)'
                size={2}
                distance={40}
                originInverted
              />
            </Animator>

            <Animator duration={{ enter: 2, interval: 4 }}>
              <Puffs
                className="background3"
                color='hsla(180, 29%, 72%, 0.25)'
                quantity={20}
              />
            </Animator>

            <div className='page__content'>
              <Component {...pageProps} />
            </div>
          </div>
        </Animator>
      </AnimatorGeneralProvider>
    </ThemeProvider>
  );
};

export default ClientApp;
