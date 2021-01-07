import React from 'react';
import clsx from 'clsx';

function Component ({
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
}) {
  return (
    <header className={clsx(classes.root, className)}>
      <a href='/'>
        <h1 className={classes.title}>Arwes Playground</h1>
      </a>
      <div className={classes.options}>
        {isCodeEnabled && (
          <div
            className={clsx(classes.option, isCodeActive && classes.optionActive)}
            onClick={onToggleCode}
            title='Toggle code editor'
          >
            <span className={clsx(classes.optionIcon, 'material-icons')}>code</span>
            <span className={classes.optionText}>Code</span>
            <span className={classes.optionLine} />
          </div>
        )}
        {isPreviewEnabled && (
          <div
            className={clsx(classes.option, isPreviewActive && classes.optionActive)}
            onClick={onTogglePreview}
            title='Toggle preview'
          >
            <span className={clsx(classes.optionIcon, 'material-icons')}>visibility</span>
            <span className={classes.optionText}>Preview</span>
            <span className={classes.optionLine} />
          </div>
        )}
        {isControlsEnabled && (
          <div
            className={clsx(classes.option, isControlsActive && classes.optionActive)}
            onClick={onToggleControls}
            title='Toggle controls'
          >
            <span className={clsx(classes.optionIcon, 'material-icons')}>settings</span>
            <span className={classes.optionText}>Controls</span>
            <span className={classes.optionLine} />
          </div>
        )}
      </div>
    </header>
  );
};

export { Component };
