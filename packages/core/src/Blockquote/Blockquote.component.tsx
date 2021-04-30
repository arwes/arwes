/* @jsx jsx */
import { FC, MutableRefObject, useMemo, CSSProperties } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animator';

import { Animated } from '../utils/Animated';
import { transitionAppear, transitionDisappear } from '../utils/appearTransitions';
import { generateStyles } from './Blockquote.styles';

interface BlockquoteProps {
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLQuoteElement | null> | ((node: HTMLQuoteElement) => void)
}

const Blockquote: FC<BlockquoteProps & WithAnimatorInputProps> = props => {
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
        animated={{
          initialStyles: { opacity: 0 },
          entering: transitionAppear,
          exiting: transitionDisappear
        }}
      />
      <Animated
        className='arwes-blockquote__line'
        css={styles.line}
        animated={{
          initialStyles: { opacity: 0, transform: 'scaleY(0)' },
          entering: [transitionAppear, { scaleY: 1 }],
          exiting: [transitionDisappear, { scaleY: 0 }]
        }}
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
  rootRef: PropTypes.any
};

export { BlockquoteProps, Blockquote };
