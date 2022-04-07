import './global.css';
import { ReactElement } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

interface ClientAppProps extends AppProps {
  Component: NextPage
}

const ClientApp = (props: ClientAppProps): ReactElement => {
  const { Component, pageProps } = props;
  return <Component {...pageProps} />;
};

export default ClientApp;
