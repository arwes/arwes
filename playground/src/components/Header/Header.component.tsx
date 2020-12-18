import React, { FC } from 'react';
import { Classes } from 'jss';
import cx from 'clsx';

interface HeaderProps {
  classes: Classes
  className?: string
  isCodeEnabled?: boolean
  isPreviewEnabled?: boolean
  isControlsEnabled?: boolean
  isCodeActive?: boolean
  isPreviewActive?: boolean
  isControlsActive?: boolean
  onToggleCode?: () => void
  onTogglePreview?: () => void
  onToggleControls?: () => void
}

const Header: FC<HeaderProps> = ({
  classes,
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
}) => {
  return (
    <header className={cx(classes.root, className)}>
      <a href='/'>
        <h1 className={classes.title}>Arwes Playground</h1>
      </a>
      <div className={classes.options}>
        {isCodeEnabled && (
          <div
            className={cx(classes.option, isCodeActive && classes.optionActive)}
            onClick={onToggleCode}
            title='Toggle code editor'
          >
            <span className={cx(classes.optionIcon, 'material-icons')}>code</span>
            <span className={classes.optionText}>Code</span>
            <span className={classes.optionLine} />
          </div>
        )}
        {isPreviewEnabled && (
          <div
            className={cx(classes.option, isPreviewActive && classes.optionActive)}
            onClick={onTogglePreview}
            title='Toggle preview'
          >
            <span className={cx(classes.optionIcon, 'material-icons')}>visibility</span>
            <span className={classes.optionText}>Preview</span>
            <span className={classes.optionLine} />
          </div>
        )}
        {isControlsEnabled && (
          <div
            className={cx(classes.option, isControlsActive && classes.optionActive)}
            onClick={onToggleControls}
            title='Toggle controls'
          >
            <span className={cx(classes.optionIcon, 'material-icons')}>settings</span>
            <span className={classes.optionText}>Controls</span>
            <span className={classes.optionLine} />
          </div>
        )}
      </div>
    </header>
  );
};

export { HeaderProps, Header };
