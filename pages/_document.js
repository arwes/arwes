import React from 'react';
import { JssProvider, SheetsRegistry } from 'react-jss';
import Document, { Head, Main, NextScript } from 'next/document';

import { getTitle } from '../site/utils';

export default class AppDocument extends Document {

  static getInitialProps ({ renderPage, pathname }) {

    const sheets = new SheetsRegistry();
    const decoratePage = Page => props => (
      <JssProvider registry={sheets}>
        <Page {...props} />
      </JssProvider>
    );

    const renderedPage = renderPage(decoratePage);

    const styles = (
      <style type='text/css' id='pages-styles'>
        {'body { opacity: 0; }'}
        {sheets.toString()}
      </style>
    );

    return { ...renderedPage, styles, pathname };
  }

  render () {
    const title = getTitle(this.props.pathname);

    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' />
          <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' />
          <meta name='theme-color' content='#000000' />
          <title>{title}</title>

          <link rel='shortcut icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Titillium+Web:400,600' />
          <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Electrolize' />

          <style type='text/css'>
          {`
            html, body {
              background-color: #000000;
            }
            body {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            *, *:before, *:after {
              box-sizing: inherit;
            }
          `}
          </style>
        </Head>
        <body>
          <Main />
          <NextScript />
          <link rel='stylesheet' href='//cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css' />
        </body>
      </html>
    );
  }
}
