import React from 'react';
import cx from 'classnames';

let globalSelectCounter = 0;

function Component ({
  classes,
  className,
  labelText,
  value,
  onChange,
  children
}) {
  const id = React.useRef('select-' + globalSelectCounter++);

  return (
    <div className={cx(classes.root, className)}>
      <label
        className={classes.labelText}
        htmlFor={id.current}
      >
        {labelText}
      </label>
      <select
        id={id.current}
        className={classes.select}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <span className={classes.arrow}>
        &#8964;
      </span>
    </div>
  );
}

export { Component };
