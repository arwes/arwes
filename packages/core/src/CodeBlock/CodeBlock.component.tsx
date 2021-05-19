/* @jsx jsx */
import { ReactNode, ReactElement, MutableRefObject, CSSProperties, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { AnimatorRef, useAnimator } from '@arwes/animator';
import { useBleeps } from '@arwes/bleeps';

import { Text, TextProps } from '../Text';
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

  const animator = useAnimator() as AnimatorRef;
  const { animate } = animator;

  const theme = useTheme();
  const bleeps = useBleeps();

  const styles = useMemo(() => generateStyles(theme, { animate }), [theme, animate]);

  const containerRef = useRef<HTMLDivElement | null>(null);

  animator.setupAnimateRefs(containerRef, bleeps);

  return (
    <div
      className={cx('arwes-code-block', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <div
        className='arwes-code-block__container'
        css={styles.container}
        ref={containerRef}
      >
        <div
          className='arwes-code-block__bg'
          css={styles.bg}
        />

        <div
          className='arwes-code-block__wrap'
          css={styles.wrap}
        >
          <Text
            {...contentTextProps}
            className='arwes-code-block__content'
            css={styles.content}
          >
            {children}
          </Text>
        </div>

        {!!lang && (
          <div
            className='arwes-code-block__lang'
            css={styles.lang}
          >
            <div
              className='arwes-code-block__lang-bg'
              css={styles.langBg}
            />
            <div
              className='arwes-code-block__line arwes-code-block__line-lang'
              css={[styles.line, styles.lineLang]}
            />
            <Text blink={false}>
              {lang}
            </Text>
          </div>
        )}

        <div
          className='arwes-code-block__line arwes-code-block__line-top'
          css={[styles.line, styles.lineTop]}
        />
        <div
          className='arwes-code-block__line arwes-code-block__line-bottom'
          css={[styles.line, styles.lineBottom]}
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
