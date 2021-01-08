/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Layout } from '../components/Layout';
import { Head } from '../components/Head';

const styles = {
  root: {
    padding: 20,

    '& h1': {
      margin: '0 0 20px'
    },
    '& p': {
      margin: '0 0 20px'
    }
  }
};

const NotFoundPage = () => (
  <Layout>
    <Head title='404: Not found' />
    <div css={styles.root}>
      <h1>404: Not Found</h1>
      <p>The place you are looking for does not exist in this galaxy.</p>
    </div>
  </Layout>
);

export default NotFoundPage;
