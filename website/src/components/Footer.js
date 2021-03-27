/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import lernaSettings from '../../../lerna.json';

const generateStyles = ({ breakpoints, palette }) => ({
  root: {
    backgroundColor: palette.neutral.elevate(1),
    borderTop: `1px solid ${palette.primary.main}`
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '0 auto',
    padding: 10,
    width: '100%',
    maxWidth: 1200,

    [breakpoints.up('md')]: {
      padding: '10px 20px'
    }
  },
  left: {},
  right: {
    '& a + a': {
      marginLeft: 10
    }
  }
});

const Footer = () => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <footer css={styles.root}>
      <div css={styles.container}>
        <div css={styles.left}>
          <a href='https://github.com/arwes/arwes' target='github' rel='noreferrer'>v{lernaSettings.version}</a>
        </div>
        <div css={styles.right}>
          <a href='https://discord.gg/s5sbTkw' target='discord' rel='noreferrer'>Discord</a>
          <a href='https://twitter.com/arwesjs' target='twitter' rel='noreferrer'>Twitter</a>
          <a href='https://github.com/arwes/arwes' target='github' rel='noreferrer'>GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
