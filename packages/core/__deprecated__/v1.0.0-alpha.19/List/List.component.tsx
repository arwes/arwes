/* @jsx jsx */
import {
  ReactNode,
  ReactElement,
  MutableRefObject,
  useRef,
  useMemo,
  CSSProperties,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { AnimatorRef, useAnimator } from '@arwes/animator';

import { generateStyles } from './List.styles';

interface ListProps {
  as?: 'ul' | 'ol'
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLUListElement | null> | ((node: HTMLUListElement) => void)
  children?: ReactNode
}

const List = (props: ListProps): ReactElement => {
  const {
    as: asProvided,
    rootRef: externalRef,
    className,
    style,
    children
  } = props;

  const animator = useAnimator() as AnimatorRef;
  const { animate } = animator;

  const as = useMemo(() => asProvided || 'ul', []);

  const internalRef = useRef<HTMLUListElement | null>(null);
  const rootRef = useCallback(node => {
    internalRef.current = node;

    if (typeof externalRef === 'function') {
      externalRef(node);
    }
    else if (externalRef) {
      externalRef.current = node;
    }
  }, []);

  const theme = useTheme();
  const styles = useMemo(() => generateStyles({ animate }), []);

  animator.setupAnimateRefs(internalRef, theme);

  return jsx(
    as,
    {
      className: cx('arwes-list', className),
      css: styles.root,
      style,
      ref: rootRef
    },
    children
  );
};

List.propTypes = {
  as: PropTypes.oneOf(['ul', 'ol']).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

List.defaultProps = {
  as: 'ul'
};

export { ListProps, List };
