/** @jsx jsx */
import { jsx } from '@emotion/react';

import { styles } from './Button.styles';

function Button ({ className, children, onClick }) {
  return (
    <button css={styles.root} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export { Button };
