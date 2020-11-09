import React from 'react';
import cx from 'classnames';

function Component ({ classes, className }) {
  return (
    <footer className={cx(classes.root, className)}>
      &copy; 2020 Arwes
    </footer>
  );
}

export { Component };
