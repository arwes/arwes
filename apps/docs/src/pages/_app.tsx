import '@app/styles/global.css';

import type { ReactElement } from 'react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { type AnimatorGeneralProviderSettings, AnimatorGeneralProvider, Animator, BleepsProvider, type BleepsManagerProps } from '@arwes/react';
import { MainLayout } from '@app/ui';
import { Header } from '@app/containers';
import { setupGoogleFonts, setupGoogleAnalytics } from '@app/utils';

interface ClientAppProps extends AppProps {
  Component: NextPage
}

const animatorsSettings: AnimatorGeneralProviderSettings = {
  disabled: false,
  duration: {
    enter: 0.15,
    exit: 0.15,
    stagger: 0.05
  }
};

const bleepsSettings: BleepsManagerProps = {
  master: {
    volume: 0.75
  },
  common: {
    disabled: false
  },
  bleeps: {
    intro: {
      sources: [
        { src: '/assets/sounds/intro.webm', type: 'audio/webm' },
        { src: '/assets/sounds/intro.mp3', type: 'audio/mpeg' }
      ]
    },
    error: {
      sources: [
        { src: '/assets/sounds/error.webm', type: 'audio/webm' },
        { src: '/assets/sounds/error.mp3', type: 'audio/mpeg' }
      ]
    }
  }
};

const ClientApp = (props: ClientAppProps): ReactElement => {
  const { Component, pageProps } = props;

  useEffect(() => {
    setupGoogleFonts();
    setupGoogleAnalytics();
  }, []);

  return (
    <AnimatorGeneralProvider {...animatorsSettings}>
      <BleepsProvider {...bleepsSettings}>
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

        <Animator combine manager='stagger'>
          <MainLayout>
            <Header />
            <Component {...pageProps} />
          </MainLayout>
        </Animator>
      </BleepsProvider>
    </AnimatorGeneralProvider>
  );
};

export default ClientApp;
