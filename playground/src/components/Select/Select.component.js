/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useRef } from 'react';

import { styles } from './Select.styles';

let globalSelectCounter = 0;

function Select ({
  className,
  labelText,
  value,
  onChange,
  children
}) {
  const id = useRef('select-' + globalSelectCounter++);

  return (
    <div css={styles.root} className={className}>
      <label
        css={styles.labelText}
        htmlFor={id.current}
      >
        {labelText}
      </label>
      <select
        id={id.current}
        css={styles.select}
        value={value}
        onChange={onChange}
      >
        <option value=''>-- Select {labelText} --</option>
        {children}
      </select>
      <span css={styles.arrow} className={'material-icons'}>
        keyboard_arrow_down
      </span>
    </div>
  );
}

export { Select };
