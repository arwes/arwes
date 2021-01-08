/** @jsx jsx */
import { jsx } from '@emotion/react';

import { styles } from './Header.styles';

function Header ({
  className,
  isCodeEnabled,
  isPreviewEnabled,
  isControlsEnabled,
  isCodeActive,
  isPreviewActive,
  isControlsActive,
  onToggleCode,
  onTogglePreview,
  onToggleControls
}) {
  return (
    <header
      className={className}
      css={styles.root}
    >
      <a href='/'>
        <h1 css={styles.title}>Arwes Playground</h1>
      </a>
      <div css={styles.options}>
        {isCodeEnabled && (
          <div
            css={[styles.option, isCodeActive && styles.optionActive]}
            onClick={onToggleCode}
            title='Toggle code editor'
          >
            <span className='material-icons' css={styles.optionIcon}>code</span>
            <span css={styles.optionText}>Code</span>
          </div>
        )}
        {isPreviewEnabled && (
          <div
            css={[styles.option, isPreviewActive && styles.optionActive]}
            onClick={onTogglePreview}
            title='Toggle preview'
          >
            <span className='material-icons' css={styles.optionIcon}>visibility</span>
            <span css={styles.optionText}>Preview</span>
          </div>
        )}
        {isControlsEnabled && (
          <div
            css={[styles.option, isControlsActive && styles.optionActive]}
            onClick={onToggleControls}
            title='Toggle controls'
          >
            <span className='material-icons' css={styles.optionIcon}>settings</span>
            <span css={styles.optionText}>Controls</span>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
