/* @jsx jsx */
import {
  HTMLProps,
  MutableRefObject,
  CSSProperties,
  ReactElement,
  ChangeEvent,
  useMemo,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { useBleeps } from '@arwes/bleeps';
import { Animated } from '@arwes/animated';

import { createTransitionerTextSimple, TransitionerTextSimple } from '../utils/createTransitionerTextSimple';
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
  inputProps?: HTMLProps<E>
  hideLines?: boolean
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<E | null> | ((node: E) => void)
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
    inputProps,
    hideLines,
    palette,
    className,
    style,
    rootRef
  } = props;

  const theme = useTheme();
  const bleeps = useBleeps();
  const styles = useMemo(() => generateStyles(theme, { palette }), [theme, palette]);

  let transitionerTextSimple: TransitionerTextSimple | null = null;

  useEffect(() => {
    return () => {
      transitionerTextSimple?.cancel();
      bleeps.type?.stop();
    };
  }, []);

  return (
    <div
      className={cx('arwes-text-field', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <Animated
        className='arwes-text-field__container'
        css={styles.container}
        animated={{
          initialStyles: { translateX: theme.space(2) },
          entering: { translateX: 0 },
          exiting: { translateX: theme.space(2) }
        }}
      >
        <Animated<HTMLInputElement>
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          readOnly={readOnly}
          spellCheck={spellCheck}
          required={required}
          disabled={disabled}
          tabIndex={readOnly ? -1 : 0}
          {...inputProps}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          as={multiline ? 'textarea' : 'input'}
          type={multiline ? undefined : type}
          className={cx('arwes-text-field__input', inputProps?.className)}
          css={styles.input}
          animated={{
            initialAttributes: {
              placeholder: ''
            },
            entering: ({ target }) => {
              target.setAttribute('placeholder', '');
            },
            entered: ({ target, duration }) => {
              // If animated and autoFocus, the element is invisible in the beginning.
              // So once it is visible, provide compatibility for the auto focus.
              // This can conflict with other HTML elements, but it's responsitibility
              // of the programmer to define which element should have the initial focus.
              if (autoFocus) {
                target.focus();
              }

              if (placeholder) {
                bleeps.type?.play();

                transitionerTextSimple?.cancel();
                transitionerTextSimple = createTransitionerTextSimple({
                  text: placeholder,
                  duration,
                  onChange: (newText: string): void => {
                    target.setAttribute('placeholder', newText);
                  },
                  onComplete: () => {
                    bleeps.type?.stop();
                  }
                });
              }
            },
            exiting: ({ target, duration }) => {
              // If the input has focus while invisibile, user would be able to type on it.
              target.blur();

              if (placeholder) {
                bleeps.type?.play();

                transitionerTextSimple?.cancel();
                transitionerTextSimple = createTransitionerTextSimple({
                  text: placeholder,
                  duration,
                  isEntering: false,
                  onChange: (newText: string): void => {
                    target.setAttribute('placeholder', newText);
                  },
                  onComplete: () => {
                    bleeps.type?.stop();
                  }
                });
              }
            }
          }}
        />
        {!hideLines &&
          <Animated
            className='arwes-text-field__line-base'
            css={styles.line}
            animated={{
              initialStyles: { scaleX: 0 },
              entering: { scaleX: 1 },
              exiting: { scaleX: 0 }
            }}
          />
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
  inputProps: PropTypes.object,
  hideLines: PropTypes.bool,
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
