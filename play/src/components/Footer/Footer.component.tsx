/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';

import lernaSettings from '@repository/lerna.json';

import { styles } from './Footer.styles';

interface FooterProps {
  className?: string
}

const Footer = (props: FooterProps): ReactElement => {
  const { className } = props;

  return (
    <footer css={styles.root} className={className}>
      <div>
        <a href={`https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`} target='github' rel='noreferrer'>
          v{lernaSettings.version}
        </a>
        <a href='/' target='website' rel='noreferrer'>Arwes</a>
        <a href='/perf' target='perf'>Perf</a>
        <a href='https://version1-breakpoint1.arwes.dev' target='version1-breakpoint1'>Previous Version</a>
      </div>
      <div>
        <a href='https://discord.gg/s5sbTkw' target='discord' rel='noreferrer'>Discord</a>
        <a href='https://twitter.com/arwesjs' target='twitter' rel='noreferrer'>Twitter</a>
        <a href='https://github.com/arwes/arwes' target='github' rel='noreferrer'>GitHub</a>
      </div>
    </footer>
  );
};

export { FooterProps, Footer };
