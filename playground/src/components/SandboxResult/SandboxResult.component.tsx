import React, { FC } from 'react';
import { Classes } from 'jss';
import cx from 'clsx';

interface SandboxResultProps {
  classes: Classes
  className?: string
  live?: {
    element?: any
    error?: string
  }
}

const SandboxResult: FC<SandboxResultProps> = ({ classes, className, live }) => {
  return (
    <div className={cx(classes.root, className)}>
      {live?.element && (
        <div className={classes.rendered}>
          <live.element />
        </div>
      )}
      {!live?.element && (
        <pre className={classes.error}>
          {live?.error}
        </pre>
      )}
    </div>
  );
};

export { SandboxResultProps, SandboxResult };
