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
        <option value=''>-- Select {labelText} --</option>
        {children}
      </select>
      <span className={cx(classes.arrow, 'material-icons')}>
        keyboard_arrow_down
      </span>
    </div>
  );
}

export { Component };
