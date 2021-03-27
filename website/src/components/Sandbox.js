/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, withLive } from 'react-live';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';
import { rgba } from 'polished';
import anime from 'animejs';
import howler from 'howler';

import * as design from '@repository/packages/design';
import * as animation from '@repository/packages/animation';
import * as sounds from '@repository/packages/sounds';

const packagesScope = Object.assign({ anime, howler }, design, animation, sounds);

const generateStyles = ({ breakpoints, palette, typography }) => ({
  root: {
    position: 'relative',
    margin: '0 0 20px'
  },

  result: {
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid ' + rgba(palette.text.root, 0.5)
  },
  resultRender: {
    padding: 20
  },
  resultError: {
    overflow: 'auto',
    margin: 0,
    border: 'none',
    padding: 20,
    background: 'none',
    fontFamily: typography.monospace,
    color: palette.error.main
  },

  edition: {
    position: 'relative',
    borderStyle: 'solid',
    borderWidth: '0 1px 1px 1px',
    borderColor: rgba(palette.text.root, 0.5)
  },
  editionLang: {
    zIndex: 1,
    position: 'absolute',
    right: 1,
    top: 1,
    borderStyle: 'solid',
    borderColor: rgba(palette.text.root, 0.5),
    borderWidth: '0 0 1px 1px',
    padding: 5,
    backgroundColor: palette.neutral.elevate(1),
    color: palette.text.root,
    lineHeight: 1,
    fontSize: 14,
    textTransform: 'uppercase',
    userSelect: 'none'
  },
  editionEditor: {
    overflow: 'auto',

    [breakpoints.up('md')]: {
      maxHeight: 600
    }
  },

  liveEditor: {
    fontSize: '14px !important',
    fontFamily: `${typography.monospace} !important`,

    '& textarea': {
      outline: 'none !important',
      color: `${palette.text.root} !important`,
      background: `${palette.neutral.elevate(0)} !important`,

      '&:hover': {
        outline: 'none'
      }
    }
  }
});

const cssStyles = {
  liveEditor: ({ palette, typography }) => ({
    fontSize: '14px !important',
    fontFamily: `${typography.monospace} !important`,

    '& textarea': {
      outline: 'none !important',
      color: `${palette.text.root} !important`,
      background: `${palette.neutral.elevate(0)} !important`,

      '&:hover': {
        outline: 'none'
      }
    }
  })
};

const SandboxResultComponent = ({ styles, live }) => (
  <div css={styles.result}>
    {live.element && (
      <div css={styles.resultRender}>
        <live.element />
      </div>
    )}
    {!live.element && (
      <pre css={styles.resultError}>
        {live.error}
      </pre>
    )}
  </div>
);

SandboxResultComponent.propTypes = {
  styles: PropTypes.object.isRequired,
  live: PropTypes.shape({
    element: PropTypes.any,
    error: PropTypes.any
  })
};

const SandboxResult = withLive(SandboxResultComponent);

const Sandbox = ({ className, children }) => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <div className={className} css={styles.root}>
      <LiveProvider
        noInline
        scope={packagesScope}
        theme={prismThemeVSDark}
        code={children}
      >
        <SandboxResult styles={styles} />
        <div css={styles.edition}>
          <div css={styles.editionLang}>JSX</div>
          <div css={styles.editionEditor}>
            <LiveEditor css={cssStyles.liveEditor} />
          </div>
        </div>
      </LiveProvider>
    </div>
  );
};

Sandbox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired
};

export { Sandbox };
