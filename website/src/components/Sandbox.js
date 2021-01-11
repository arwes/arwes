/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { LiveProvider, LiveEditor, withLive } from 'react-live';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';
import { rgba } from 'polished';
import anime from 'animejs';
import howler from 'howler';

import * as animation from '@repository/packages/animation';
import * as sounds from '@repository/packages/sounds';

const packagesScope = Object.assign({ anime, howler }, animation, sounds);

const styles = {
  root: {
    position: 'relative',
    margin: '0 0 20px'
  },

  result: theme => ({
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid ' + rgba(theme.color.content, 0.5)
  }),
  resultRender: {
    padding: 20
  },
  resultError: theme => ({
    overflow: 'auto',
    margin: 0,
    border: 'none',
    padding: 20,
    background: 'none',
    fontFamily: theme.typography.monospace,
    color: theme.color.error
  }),

  edition: theme => ({
    position: 'relative',
    borderStyle: 'solid',
    borderWidth: '0 1px 1px 1px',
    borderColor: rgba(theme.color.content, 0.5)
  }),
  editionLang: theme => ({
    zIndex: 1,
    position: 'absolute',
    right: 1,
    top: 1,
    borderStyle: 'solid',
    borderColor: rgba(theme.color.content, 0.5),
    borderWidth: '0 0 1px 1px',
    padding: 5,
    backgroundColor: theme.color.section,
    color: theme.color.content,
    lineHeight: 1,
    fontSize: 14,
    textTransform: 'uppercase',
    userSelect: 'none'
  }),
  editionEditor: theme => ({
    overflow: 'auto',

    [theme.breakpoints.tabletUp]: {
      maxHeight: 600
    }
  })
};

const cssStyles = {
  liveEditor: theme => ({
    fontSize: '14px !important',
    fontFamily: `${theme.typography.monospace} !important`,

    '& textarea': {
      outline: 'none !important',
      color: `${theme.color.content} !important`,
      background: `${theme.color.neutral} !important`,

      '&:hover': {
        outline: 'none'
      }
    }
  })
};

const SandboxResultComponent = ({ live }) => (
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
  live: PropTypes.shape({
    element: PropTypes.any,
    error: PropTypes.any
  })
};

const SandboxResult = withLive(SandboxResultComponent);

const Sandbox = ({ className, children }) => {
  return (
    <div className={className} css={styles.root}>
      <LiveProvider
        noInline
        scope={packagesScope}
        theme={prismThemeVSDark}
        code={children}
      >
        <SandboxResult />
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
