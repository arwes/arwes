import React from 'react';
import { LiveEditor } from 'react-live';
import clsx from 'clsx';

function Component ({ classes, className }) {
  return <LiveEditor className={clsx(classes.root, className)} />;
}

export { Component };
