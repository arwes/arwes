/** @jsx jsx */
import { jsx } from '@emotion/react';

import { Page } from '../components/Page';

const styles = {
  container: {
    display: 'flex'
  },
  content: {
    margin: 'auto',
    padding: '1rem',
    textAlign: 'center',

    h1: {
      margin: '0 0 20px'
    },
    p: {
      margin: '0 0 20px'
    }
  }
};

const NotFoundPage = () => (
  <Page
    containerCSS={styles.container}
    headProps={{
      title: '404: Not found'
    }}
    isContent={false}
  >
    <div css={styles.content}>
      <h1>404: Not Found</h1>
      <p>The place you are looking for does not exist in this galaxy.</p>
    </div>
  </Page>
);

export default NotFoundPage;
