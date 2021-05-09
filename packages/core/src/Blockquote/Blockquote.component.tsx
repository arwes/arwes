/* @jsx jsx */
import { FC, MutableRefObject, CSSProperties, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { Animator, AnimatorSettings } from '@arwes/animator';
import { Animated, transitionVisibility, transitionVisibilityIn, transitionVisibilityOut } from '@arwes/animated';

import { generateStyles } from './Blockquote.styles';

interface BlockquoteProps {
  animator?: AnimatorSettings
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLQuoteElement | null> | ((node: HTMLQuoteElement) => void)
}

const Blockquote: FC<BlockquoteProps> = memo(props => {
  const { animator, palette, className, style, rootRef, children } = props;

  const theme = useTheme();
  const styles = useMemo(() => generateStyles(theme, { palette }), [theme, palette]);

  return (
    <Animator animator={{
      manager: 'stagger',
      combine: true,
      ...animator
    }}>
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
          animated={{
            initialStyles: { opacity: 0, scaleY: 0 },
            entering: [transitionVisibilityIn, { scaleY: 1 }],
            exiting: [transitionVisibilityOut, { scaleY: 0 }]
          }}
        />
        <div
          className='arwes-blockquote__content'
          css={styles.content}
        >
          {children}
        </div>
      </blockquote>
    </Animator>
  );
});

Blockquote.propTypes = {
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

export { BlockquoteProps, Blockquote };
