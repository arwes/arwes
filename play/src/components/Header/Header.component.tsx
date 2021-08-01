/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement } from 'react';

import { useRouterState } from '../../tools/useRouterState';
import { styles } from './Header.styles';

interface HeaderProps {
  className?: string
}

const Header = (props: HeaderProps): ReactElement => {
  const { className } = props;

  const [routerState] = useRouterState();
  const {
    isEditorEnabled,
    isPreviewEnabled,
    isControlsEnabled,
    isEditorActive,
    isPreviewActive,
    isControlsActive,
    toggleEditor,
    togglePreview,
    toggleControls
  } = routerState;

  return (
    <header
      className={className}
      css={styles.root}
    >
      <a href='/play'>
        <h1 css={styles.title}>Arwes Playground</h1>
      </a>
      <div css={styles.options}>
        {isControlsEnabled && (
          <div
            css={[styles.option, isControlsActive && styles.optionActive]}
            onClick={() => toggleControls?.()}
            title='Toggle controls'
          >
            Controls
          </div>
        )}
        {isEditorEnabled && (
          <div
            css={[styles.option, isEditorActive && styles.optionActive]}
            onClick={() => toggleEditor?.()}
            title='Toggle code editor'
          >
            Editor
          </div>
        )}
        {isPreviewEnabled && (
          <div
            css={[styles.option, isPreviewActive && styles.optionActive]}
            onClick={() => togglePreview?.()}
            title='Toggle preview'
          >
            Preview
          </div>
        )}
      </div>
    </header>
  );
};

export { HeaderProps, Header };
