/** @jsx jsx */
import { jsx } from '@emotion/react';

import lernaSettings from 'repository/lerna.json';
import { styles } from './Footer.styles';

function Footer ({ className }) {
  return (
    <footer css={styles.root} className={className}>
      <div>
        <a href='https://arwes.dev' target='website' rel='noreferrer'>arwes.dev</a>
        <a href='https://github.com/arwes/arwes' target='github' rel='noreferrer'>v{lernaSettings.version}</a>
      </div>
      <div>
        <a href='https://discord.gg/s5sbTkw' target='discord' rel='noreferrer'>Discord</a>
        <a href='https://twitter.com/arwesjs' target='twitter' rel='noreferrer'>Twitter</a>
        <a href='https://github.com/arwes/arwes' target='github' rel='noreferrer'>GitHub</a>
      </div>
    </footer>
  );
}

export { Footer };
