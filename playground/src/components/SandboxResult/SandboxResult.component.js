import React from 'react';
import cx from 'classnames';

function Component ({ classes, className, live }) {
  return (
    <div className={cx(classes.root, className)}>
      {live.element && (
        <div className={classes.rendered}>
          <live.element />
        </div>
      )}
      {!live.element && (
        <pre className={classes.error}>
          {live.error}
        </pre>
      )}
    </div>
  );
};

export { Component };
