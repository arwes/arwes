import React from 'react';
import clsx from 'clsx';

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
    <div className={clsx(classes.root, className)}>
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
      <span className={clsx(classes.arrow, 'material-icons')}>
        keyboard_arrow_down
      </span>
    </div>
  );
}

export { Component };
