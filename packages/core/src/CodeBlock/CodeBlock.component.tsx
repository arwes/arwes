/* @jsx jsx */
import { ReactNode, ReactElement, MutableRefObject, CSSProperties, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { Animated, AnimatedSettings, transitionVisibility } from '@arwes/animated';

import { Text, TextProps } from '../Text';
import { BleepsOnAnimator } from '../utils/BleepsOnAnimator';
import { generateStyles } from './CodeBlock.styles';

interface CodeBlockProps {
  lang?: string
  contentTextProps?: TextProps
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
  children?: ReactNode
}

const CodeBlock = (props: CodeBlockProps): ReactElement => {
  const {
    lang,
    contentTextProps,
    children,
    className,
    style,
    rootRef
  } = props;

  const theme = useTheme();
  const styles = useMemo(() => generateStyles(theme), [theme]);

  const lineAnimated: AnimatedSettings = {
    initialStyles: { scaleX: 0 },
    entering: { scaleX: 1 },
    exiting: { scaleX: 0 }
  };

  return (
    <div
      className={cx('arwes-code-block', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <BleepsOnAnimator
        entering={{ name: 'assemble', loop: true }}
        exiting={{ name: 'assemble', loop: true }}
      />

      <div
        className='arwes-code-block__container'
        css={styles.container}
      >
        <Animated
          className='arwes-code-block__bg'
          css={styles.bg}
          animated={transitionVisibility}
        />

        <Animated
          className='arwes-code-block__wrap'
          css={styles.wrap}
          // Hide element only when animations are EXITED.
          animated={{
            initialStyles: { opacity: 0 },
            entering: { opacity: 1, easing: () => (progress: number): number => progress ? 1 : 0 },
            exiting: { opacity: 0, easing: () => (progress: number): number => progress === 1 ? 1 : 0 }
          }}
        >
          <Text
            {...contentTextProps}
            className='arwes-code-block__content'
            css={styles.content}
          >
            {children}
          </Text>
        </Animated>

        {!!lang && (
          <div
            className='arwes-code-block__lang'
            css={styles.lang}
          >
            <Animated
              className='arwes-code-block__lang-bg'
              css={styles.langBg}
              animated={transitionVisibility}
            />
            <Animated
              className='arwes-code-block__line arwes-code-block__line-lang'
              css={[styles.line, styles.lineLang]}
              animated={lineAnimated}
            />
            <Text blink={false}>
              {lang}
            </Text>
          </div>
        )}

        <Animated
          className='arwes-code-block__line arwes-code-block__line-top'
          css={[styles.line, styles.lineTop]}
          animated={lineAnimated}
        />
        <Animated
          className='arwes-code-block__line arwes-code-block__line-bottom'
          css={[styles.line, styles.lineBottom]}
          animated={lineAnimated}
        />
      </div>
    </div>
  );
};

CodeBlock.propTypes = {
  lang: PropTypes.string,
  contentTextProps: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any,
  children: PropTypes.any
};

CodeBlock.defaultProps = {
  contentTextProps: {
    as: 'pre',
    blink: false
  }
};

export { CodeBlockProps, CodeBlock };
