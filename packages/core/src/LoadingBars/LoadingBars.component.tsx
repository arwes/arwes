/* @jsx jsx */
import { FC, MutableRefObject, useRef, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { jsx, useTheme } from '@emotion/react';
import { WithAnimatorInputProps } from '@arwes/animation';

import { generateStyles } from './LoadingBars.styles';
import {
  LoadingBarsEffectsRefs,
  stopLoadingBarsUndeterminateAnimation,
  startLoadingBarsUndeterminateAnimation
} from './LoadingBars.effects';

interface LoadingBarsProps {
  determinate?: boolean
  length?: number
  progress?: number
  size?: number
  full?: boolean
  speed?: number
  rootRef?: MutableRefObject<HTMLElement> | ((node: HTMLElement) => void)
}

const LoadingBars: FC<LoadingBarsProps & WithAnimatorInputProps> = props => {
  const { animator, determinate, rootRef: externalRootRef } = props;
  const length = props.length as number;
  const progress = props.progress as number;
  const size = props.size as number;
  const speed = props.speed as number;
  const full = !!props.full;
  const { animate, flow } = animator;

  const theme = useTheme();
  const styles = useMemo(
    () => generateStyles(theme, { animate, length, size, full }),
    [theme, animate, length, size, full]
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const animateRefs: LoadingBarsEffectsRefs = useRef({
    rootRef,
    animationFrameId: 0
  });

  const internalRootRef = useCallback((node: HTMLDivElement): void => {
    rootRef.current = node;

    if (typeof externalRootRef === 'function') {
      externalRootRef(node);
    }
    else if (externalRootRef) {
      externalRootRef.current = node;
    }
  }, []);

  useEffect(() => {
    if (!determinate && flow.entered) {
      startLoadingBarsUndeterminateAnimation(animator, animateRefs, styles, { speed });
    }
    return () => stopLoadingBarsUndeterminateAnimation(animator, animateRefs, styles);
  }, [determinate, flow.entered]);

  animator.setupAnimateRefs(animateRefs, theme);

  return (
    <div
      className='arwes-loading-bars'
      css={styles.root}
      ref={internalRootRef}
    >
      <div
        className='arwes-loading-bars__container'
        css={styles.container}
      >
        {Array(length).fill(0).map((_, index) =>
          <div
            key={index}
            className='arwes-loading-bars__item'
            css={[
              styles.item,
              determinate &&
                ((!index && progress > 0) || ((index + 1) <= ((progress * length) / 100))) &&
                styles.itemPrimaryActive
            ]}
          />
        )}
      </div>
    </div>
  );
};

LoadingBars.propTypes = {
  determinate: PropTypes.bool,
  length: PropTypes.number.isRequired,
  progress: PropTypes.number,
  size: PropTypes.number.isRequired,
  full: PropTypes.bool,
  speed: PropTypes.number.isRequired,
  rootRef: PropTypes.any
};

LoadingBars.defaultProps = {
  length: 8,
  progress: 0,
  size: 1,
  speed: 3
};

export { LoadingBarsProps, LoadingBars };
