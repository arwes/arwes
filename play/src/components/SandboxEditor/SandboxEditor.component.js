/** @jsx jsx */
import { jsx } from '@emotion/react';
import { LiveEditor } from 'react-live';

import { styles } from './SandboxEditor.styles';

function SandboxEditor ({ className }) {
  return (
    <LiveEditor
      className={className}
      css={styles.root}
    />
  );
}

export { SandboxEditor };
