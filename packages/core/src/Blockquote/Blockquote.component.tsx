/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { generateStyles } from './Blockquote.styles';

interface BlockquoteProps {
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLQuoteElement | null> | ((node: HTMLQuoteElement) => void)
}

const Blockquote: FC<BlockquoteProps & WithAnimatorInputProps> = props => {
  const { animator, palette, className, style, rootRef, children } = props;
  const { animate } = animator;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate, palette }),
    [theme, animate, palette]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);

  animator.setupAnimateRefs(containerRef);

  return (
    <blockquote
      className={cx('arwes-blockquote', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <div
        className='arwes-blockquote__container'
        css={styles.container}
        ref={containerRef}
      >
        <div
          className='arwes-blockquote__bg'
          css={styles.bg}
        />
        <div
          className='arwes-blockquote__line'
          css={styles.line}
        />
        <div
          className='arwes-blockquote__content'
          css={styles.content}
        >
          {children}
        </div>
      </div>
    </blockquote>
  );
};

Blockquote.propTypes = {
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

export { BlockquoteProps, Blockquote };
