/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';

import { styles } from './SandboxResult.styles';

interface SandboxResultProps {
  className?: string
  live?: any
}

const SandboxResult = (props: SandboxResultProps): ReactElement => {
  const { className, live } = props;
  return (
    <div className={className} css={styles.root}>
      {live.element && (
        <div css={styles.rendered}>
          <live.element />
        </div>
      )}
      {!live.element && (
        <pre css={styles.error}>
          {live.error}
        </pre>
      )}
    </div>
  );
};

export { SandboxResultProps, SandboxResult };
