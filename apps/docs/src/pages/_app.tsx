import './global.css';

import type { ReactElement } from 'react';
import { type NextPage } from 'next';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Animator, AnimatorGeneralProvider } from '@arwes/react';

import { MainLayout } from '../ui';
import { Header } from '../containers';
import { setupGoogleFonts, setupGoogleAnalytics } from '../utils';

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
          <MainLayout>
            <Header />
            <Component {...pageProps} />
          </MainLayout>
        </Animator>
      </AnimatorGeneralProvider>
    </ThemeProvider>
  );
};

export default ClientApp;
