import '@app/styles/global.css';

import type { ReactElement } from 'react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import {
  type AnimatorGeneralProviderSettings,
  type BleepsProviderSettings,
  AnimatorGeneralProvider,
  Animator,
  BleepsProvider
} from '@arwes/react';

import type { BleepNames } from '@app/types';
import { MainLayout } from '@app/ui';
import { Header } from '@app/containers';
import { setupGoogleFonts, setupGoogleAnalytics, atomMotion, atomAudio } from '@app/utils';

interface ClientAppProps extends AppProps {
  Component: NextPage
}

const animatorsSettings: AnimatorGeneralProviderSettings = {
  duration: {
    enter: 0.15,
    exit: 0.15,
    stagger: 0.05
  }
};

const bleepsSettings: BleepsProviderSettings<BleepNames> = {
  master: { volume: 0.8 },
  categories: {
    background: { volume: 0.3 },
    transition: { volume: 0.5 },
    interaction: { volume: 0.7 },
    notification: { volume: 1 }
  },
  bleeps: {
    click: {
      category: 'interaction',
      sources: [
        { src: '/assets/sounds/click.webm', type: 'audio/webm' },
        { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
      ]
    },
    open: {
      category: 'interaction',
      sources: [
        { src: '/assets/sounds/open.webm', type: 'audio/webm' },
        { src: '/assets/sounds/open.mp3', type: 'audio/mpeg' }
      ]
    },
    close: {
      category: 'interaction',
      sources: [
        { src: '/assets/sounds/close.webm', type: 'audio/webm' },
        { src: '/assets/sounds/close.mp3', type: 'audio/mpeg' }
      ]
    },
    info: {
      category: 'notification',
      sources: [
        { src: '/assets/sounds/info.webm', type: 'audio/webm' },
        { src: '/assets/sounds/info.mp3', type: 'audio/mpeg' }
      ]
    },
    error: {
      category: 'notification',
      sources: [
        { src: '/assets/sounds/error.webm', type: 'audio/webm' },
        { src: '/assets/sounds/error.mp3', type: 'audio/mpeg' }
      ]
    },
    intro: {
      category: 'transition',
      sources: [
        { src: '/assets/sounds/intro.webm', type: 'audio/webm' },
        { src: '/assets/sounds/intro.mp3', type: 'audio/mpeg' }
      ]
    },
    content: {
      category: 'transition',
      sources: [
        { src: '/assets/sounds/content.webm', type: 'audio/webm' },
        { src: '/assets/sounds/content.mp3', type: 'audio/mpeg' }
      ]
    },
    type: {
      category: 'transition',
      sources: [
        { src: '/assets/sounds/type.webm', type: 'audio/webm' },
        { src: '/assets/sounds/type.mp3', type: 'audio/mpeg' }
      ],
      loop: true
    },
    assemble: {
      category: 'transition',
      sources: [
        { src: '/assets/sounds/assemble.webm', type: 'audio/webm' },
        { src: '/assets/sounds/assemble.mp3', type: 'audio/mpeg' }
      ],
      loop: true
    }
  }
};

const ClientApp = (props: ClientAppProps): ReactElement => {
  const { Component, pageProps } = props;

  useEffect(() => {
    setupGoogleFonts();
    setupGoogleAnalytics();
  }, []);

  const motion = useAtomValue(atomMotion);
  const audio = useAtomValue(atomAudio);

  return (
    <AnimatorGeneralProvider {...animatorsSettings} disabled={!motion}>
      <BleepsProvider {...bleepsSettings} common={{ disabled: !audio }}>
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
        </Head>

        <Animator combine manager='stagger'>
          <MainLayout>
            <Header />
            <Component {...pageProps} />
          </MainLayout>

          {/* Element used to render all modals for them to be above all other
              application components. */}
          <div id='app-modal-container' />
        </Animator>
      </BleepsProvider>
    </AnimatorGeneralProvider>
  );
};

export default ClientApp;
