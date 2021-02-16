// TODO: Transitioning scroll changes the size of the container.
// TODO: Setup proper bleep.

/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';
import { WithBleepsInputProps } from '@arwes/sounds';

import { Text, TextProps } from '../Text';
import { generateStyles } from './CodeBlock.styles';

interface CodeBlockProps {
  lang?: string
  contentTextProps?: TextProps
  rootRef?: MutableRefObject<HTMLElement> | Function
}

const CodeBlock: FC<CodeBlockProps & WithAnimatorInputProps & WithBleepsInputProps> = props => {
  const {
    animator,
    bleeps,
    lang,
    contentTextProps,
    children,
    rootRef: externalRootRef
  } = props;
  const { animate } = animator;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate }),
    [theme, animator.animate]
  );

  // TODO: Modularize the way to join multiple references into one.
  const internalRootRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useCallback(node => {
    internalRootRef.current = node;

    if (typeof externalRootRef === 'function') {
      externalRootRef(node);
    }
    else if (externalRootRef) {
      externalRootRef.current = node;
    }
  }, []);

  animator.setupAnimateRefs(internalRootRef, theme, bleeps);

  return (
    <div
      className='arwes-code-block'
      css={styles.root}
      ref={rootRef}
    >
      <div
        className='arwes-code-block__line arwes-code-block__line-top'
        css={[styles.line, styles.lineTop]}
      />
      {!!lang && (
        <div
          className='arwes-code-block__lang'
          css={styles.lang}
        >
          <Text blink={false}>
            {lang}
          </Text>
          <div
            className='arwes-code-block__line arwes-code-block__line-lang'
            css={[styles.line, styles.lineLang]}
          />
        </div>
      )}
      <div
        className='arwes-code-block__container'
        css={[
          styles.container,
          !animator.flow.entered && styles.containerIsTransitioning
        ]}
      >
        <Text
          {...contentTextProps}
          className='arwes-code-block__content'
          css={styles.content}
        >
          {children}
        </Text>
      </div>
      <div
        className='arwes-code-block__line arwes-code-block__line-bottom'
        css={[styles.line, styles.lineBottom]}
      />
    </div>
  );
};

CodeBlock.propTypes = {
  lang: PropTypes.string,
  contentTextProps: PropTypes.object,
  rootRef: PropTypes.any
};

CodeBlock.defaultProps = {
  contentTextProps: {
    as: 'pre',
    blink: false
  }
};

export { CodeBlockProps, CodeBlock };
