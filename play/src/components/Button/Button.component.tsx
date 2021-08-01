/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactNode, ReactElement } from 'react';

import { styles } from './Button.styles';

interface ButtonProps {
  className?: string
  children?: ReactNode
  onClick?: () => void
}

const Button = (props: ButtonProps): ReactElement => {
  const { className, children, onClick } = props;
  return (
    <button css={styles.root} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export { Button };
