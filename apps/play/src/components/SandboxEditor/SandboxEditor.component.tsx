/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';
import { LiveEditor } from 'react-live';

import { styles } from './SandboxEditor.styles';

interface SandboxEditorProps {
  className?: string
}

const SandboxEditor = (props: SandboxEditorProps): ReactElement => {
  const { className } = props;
  return (
    <LiveEditor
      className={className}
      css={styles.root}
    />
  );
};

export { SandboxEditorProps, SandboxEditor };
