import React from 'react';
import cx from 'classnames';

function Component ({ classes, className, onMenu }) {
  return (
    <header className={cx(classes.root, className)}>
      <span
        className={cx(classes.menu, 'material-icons')}
        onClick={onMenu}
      >
        menu
      </span>
      <a href='/'>
        <h1 className={classes.title}>Arwes Playground</h1>
      </a>
    </header>
  );
};

export { Component };
