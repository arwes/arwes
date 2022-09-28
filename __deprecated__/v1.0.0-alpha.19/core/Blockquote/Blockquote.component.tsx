/* @jsx jsx */
import { MutableRefObject, CSSProperties, ReactNode, ReactElement, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { Animated, transitionVisibility } from '@arwes/animated';

import { generateStyles } from './Blockquote.styles';

interface BlockquoteProps {
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLQuoteElement | null> | ((node: HTMLQuoteElement) => void)
  children?: ReactNode
}

const Blockquote = (props: BlockquoteProps): ReactElement => {
  const { palette, className, style, rootRef, children } = props;

  const theme = useTheme();
  const styles = useMemo(() => generateStyles(theme, { palette }), [theme, palette]);

  return (
    <blockquote
      className={cx('arwes-blockquote', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <Animated
        className='arwes-blockquote__bg'
        css={styles.bg}
        animated={transitionVisibility}
      />
      <Animated
        className='arwes-blockquote__line'
        css={styles.line}
        animated={[
          transitionVisibility,
          { entering: { scaleY: 1 }, exiting: { scaleY: 0 } }
        ]}
      />
      <div
        className='arwes-blockquote__content'
        css={styles.content}
      >
        {children}
      </div>
    </blockquote>
  );
};

Blockquote.propTypes = {
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any,
  children: PropTypes.any
};

export { BlockquoteProps, Blockquote };
