import React, { FC } from 'react';
import { Classes } from 'jss';
import { LiveEditor } from 'react-live';
import cx from 'clsx';

interface SandboxEditorProps {
  classes: Classes
  className?: string
}

const SandboxEditor: FC<SandboxEditorProps> = ({ classes, className }) => {
  return (
    <LiveEditor className={cx(classes.root, className)} />
  );
};

export { SandboxEditorProps, SandboxEditor };
