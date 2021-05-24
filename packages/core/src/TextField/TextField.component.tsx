/* @jsx jsx */
import { HTMLProps, MutableRefObject, CSSProperties, ReactElement, FormEvent, ChangeEvent, useMemo } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { Animated } from '@arwes/animated';

import { BleepsOnAnimator } from '../utils/BleepsOnAnimator';
import { generateStyles } from './TextField.styles';

type TEXT_FIELD_TYPE = 'text' | 'email' | 'search' | 'password' | 'tel' | 'url' | 'number';
const TEXT_FIELD_TYPE_VALUES: TEXT_FIELD_TYPE[] = ['text', 'email', 'search', 'password', 'tel', 'url', 'number'];

// TODO: Interface element type should be inferred from the component props multiline.

interface TextFieldProps <E extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement> {
  multiline?: boolean
  type?: TEXT_FIELD_TYPE
  name?: string
  placeholder?: string
  autoComplete?: string
  autoFocus?: boolean
  readOnly?: boolean
  spellCheck?: boolean
  required?: boolean
  disabled?: boolean
  defaultValue?: string | number
  value?: string | number
  onChange?: (event: ChangeEvent<E>) => void
  onInput?: (event: FormEvent<E>) => void
  inputProps?: HTMLProps<E>
  hideLine?: boolean
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
}

const TextField = (props: TextFieldProps): ReactElement => {
  const {
    multiline,
    type,
    name,
    placeholder,
    autoComplete,
    autoFocus,
    readOnly,
    spellCheck,
    required,
    disabled,
    defaultValue,
    value,
    onChange,
    onInput,
    inputProps,
    hideLine,
    palette,
    className,
    style,
    rootRef
  } = props;

  const theme = useTheme();
  const styles = useMemo(() => generateStyles(theme, { palette }), [theme, palette]);

  return (
    <div
      className={cx('arwes-text-field', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <BleepsOnAnimator
        entering={{ name: 'type', loop: true }}
        exiting={{ name: 'type', loop: true }}
      />
      <Animated
        className='arwes-text-field__container'
        css={styles.container}
        animated={{
          initialStyles: { translateX: theme.space(1) },
          entering: { translateX: 0 },
          exiting: { translateX: theme.space(1) }
        }}
      >
        {!hideLine &&
          <Animated
            css={styles.line}
            animated={{
              initialStyles: { scaleX: 0 },
              entering: { scaleX: 1 },
              exiting: { scaleX: 0 }
            }}
          />
        }
        <Animated
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          readOnly={readOnly}
          spellCheck={spellCheck}
          required={required}
          disabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          onInput={onInput}
          {...inputProps}
          as={multiline ? 'textarea' : 'input'}
          type={multiline ? undefined : type}
          className={cx('arwes-text-field__input', inputProps?.className)}
          css={styles.input}
        />
        {!hideLine &&
          <div css={[styles.line, styles.lineOver]} />
        }
      </Animated>
    </div>
  );
};

TextField.propTypes = {
  multiline: PropTypes.bool,
  type: PropTypes.oneOf(TEXT_FIELD_TYPE_VALUES).isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  spellCheck: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onInput: PropTypes.func,
  inputProps: PropTypes.object,
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any
};

TextField.defaultProps = {
  type: 'text'
};

export {
  TEXT_FIELD_TYPE,
  TEXT_FIELD_TYPE_VALUES,
  TextFieldProps,
  TextField
};
