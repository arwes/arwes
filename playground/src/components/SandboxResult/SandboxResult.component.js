/** @jsx jsx */
import { jsx } from '@emotion/react';

import { styles } from './SandboxResult.styles';

function SandboxResult ({ className, live }) {
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

export { SandboxResult };
