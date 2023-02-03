import './global.css';

import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { useEffect } from 'react';

import { setupGoogleFonts } from '../utils/setupGoogleFonts';
import { setupGoogleAnalytics } from '../utils/setupGoogleAnalytics';

interface ClientAppProps extends AppProps {
  Component: NextPage
}

const ClientApp = (props: ClientAppProps): ReactElement => {
  useEffect(() => {
    setupGoogleFonts();
    setupGoogleAnalytics();
  }, []);

  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default ClientApp;
