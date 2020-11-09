import React from 'react';
import { LiveEditor } from 'react-live';
import cx from 'classnames';

function Component ({ classes, className }) {
  return (
    <LiveEditor className={cx(classes.root, className)} />
  );
}

export { Component };
