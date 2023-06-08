import { type ReactElement } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Page = (): ReactElement => {
  return (
    <Html lang='en'>
      <Head>
        <style>{`
          html {
            background-color: #050b0b;
          }
        `}</style>
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Page;
