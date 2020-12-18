import React, { FC, ChangeEvent, useRef } from 'react';
import { Classes } from 'jss';
import cx from 'clsx';

let globalSelectCounter = 0;

interface SelectProps {
  classes: Classes
  className?: string
  labelText: string
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = ({
  classes,
  className,
  labelText,
  value,
  onChange,
  children
}) => {
  const id = useRef('select-' + String(globalSelectCounter++));

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
};

export { SelectProps, Select };
