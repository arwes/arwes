/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import prismThemeVSDark from 'prism-react-renderer/themes/vsDark';
import { rgba } from 'polished';

const generateStyles = ({ palette }) => ({
  root: {
    position: 'relative',
    margin: '0 0 20px'
  },
  language: {
    position: 'absolute',
    right: 1,
    top: 1,
    borderStyle: 'solid',
    borderColor: rgba(palette.primary.main, 0.5),
    borderWidth: '0 0 1px 1px',
    padding: 5,
    backgroundColor: palette.neutral.elevate(1),
    color: palette.primary.main,
    lineHeight: 1,
    fontSize: 14,
    textTransform: 'uppercase',
    userSelect: 'none'
  },
  pre: {
    margin: 0,
    fontSize: 14,
    backgroundColor: `${palette.neutral.elevate(0)} !important`
  }
});

const Code = ({ className, language, theme: codeTheme, children }) => {
  const theme = useTheme();
  const styles = generateStyles(theme);

  return (
    <Highlight
      {...defaultProps}
      className={className}
      code={children}
      language={language}
      theme={codeTheme}
    >
      {({ className: hlClassName, style, tokens, getLineProps, getTokenProps }) => (
        <div css={styles.root}>
          {language !== 'text' && (
            <div css={styles.language}>{language}</div>
          )}
          <pre
            className={cx(className, hlClassName)}
            style={style}
            css={styles.pre}
          >
            {tokens
              .filter((line, index) => {
                const isLastLine = index === tokens.length - 1;
                const noTokens = !line.length;
                const isOnlyEmptyToken = line.length === 1 && line[0].empty;
                return !(isLastLine && (noTokens || isOnlyEmptyToken));
              })
              .map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))
            }
          </pre>
        </div>
      )}
    </Highlight>
  );
};

Code.propTypes = {
  className: PropTypes.string,
  language: PropTypes.string.isRequired,
  theme: PropTypes.any,
  children: PropTypes.string.isRequired
};

Code.defaultProps = {
  theme: prismThemeVSDark
};

export { Code };
