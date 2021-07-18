/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import lernaSettings from '../../../lerna.json';

const generateStyles = ({ breakpoints, palette }) => ({
  root: {
    userSelect: 'none'
  },
  container: {
    margin: '0 auto',
    padding: '0.5rem',
    width: '100%',
    maxWidth: 1600,

    [breakpoints.up('md')]: {
      padding: '0 1rem 0.5rem'
    }
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderTop: `1px solid ${palette.primary.main}`,
    textAlign: 'center',
    padding: '1rem 0.5rem',

    'a + a': {
      marginLeft: '1rem'
    },

    [breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '1.5rem'
    },
    [breakpoints.up('md')]: {
      padding: '1rem'
    }
  },
  containerLeft: {
    marginBottom: '1rem',

    [breakpoints.up('sm')]: {
      marginBottom: 0
    }
  }
});

const Footer = () => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <footer css={styles.root}>
      <div css={styles.container}>
        <div css={styles.content}>
          <div css={styles.containerLeft}>
            <a href={`https://github.com/arwes/arwes/releases/tag/v${lernaSettings.version}`} target='github' rel='noreferrer'>
              v{lernaSettings.version}
            </a>
            <a href='/play' target='play'>Play</a>
            <a href='/perf' target='perf'>Perf</a>
          </div>
          <div>
            <a href='https://discord.gg/s5sbTkw' target='discord' rel='noreferrer'>Discord</a>
            <a href='https://twitter.com/arwesjs' target='twitter' rel='noreferrer'>Twitter</a>
            <a href='https://github.com/arwes/arwes' target='github' rel='noreferrer'>GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
