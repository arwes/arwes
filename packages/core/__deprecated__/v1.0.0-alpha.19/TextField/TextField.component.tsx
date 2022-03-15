/* @jsx jsx */
import {
  HTMLProps,
  MutableRefObject,
  CSSProperties,
  ReactElement,
  ChangeEvent,
  useMemo,
  useRef,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { useBleeps } from '@arwes/bleeps';
import { Animated, transitionOpacity } from '@arwes/animated';

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

  const styles = useMemo(
    () => generateStyles(theme, { palette, multiline, disabled, readOnly }),
    [theme, palette, multiline, disabled, readOnly]
  );

  const transitionerTextSimpleRef = useRef<TransitionerTextSimple | null>(null);

  useEffect(() => {
    return () => {
      transitionerTextSimpleRef.current?.cancel();
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
      <Animated<HTMLLabelElement>
        as='label'
        className='arwes-text-field__container'
        css={styles.container}
        animated={[
          {
            initialStyles: { translateX: theme.space() },
            entering: { translateX: 0 },
            exiting: { translateX: theme.space() }
          },
          {
            entering: ({ target }) => {
              const animatedTextElement = target.querySelector('.arwes-text-field__animated-text') as HTMLDivElement;
              const inputElement = target.querySelector('.arwes-text-field__input') as HTMLInputElement;

              animatedTextElement.style.opacity = '0';
              inputElement.style.opacity = '0';
            },
            entered: ({ target, duration }) => {
              const animatedTextElement = target.querySelector('.arwes-text-field__animated-text') as HTMLDivElement;
              const inputElement = target.querySelector('.arwes-text-field__input') as HTMLInputElement;

              animatedTextElement.style.opacity = '1';
              inputElement.style.opacity = '0';

              const text = inputElement.value || placeholder || '';

              if (inputElement.value) {
                Object.assign(animatedTextElement.style, styles.animatedTextIsTextValuePlainStyles);
              }
              else {
                Object.assign(animatedTextElement.style, styles.animatedTextIsTextPlaceholderPlainStyles);
              }

              if (text) {
                bleeps.type?.play();

                transitionerTextSimpleRef.current?.cancel();
                transitionerTextSimpleRef.current = createTransitionerTextSimple({
                  duration,
                  text,
                  onChange: (newText: string): void => {
                    animatedTextElement.textContent = newText;
                  },
                  onComplete: () => {
                    bleeps.type?.stop();

                    animatedTextElement.style.opacity = '0';
                    inputElement.style.opacity = '1';
                  }
                });
              }
            },
            exiting: ({ target, duration }) => {
              const animatedTextElement = target.querySelector('.arwes-text-field__animated-text') as HTMLDivElement;
              const inputElement = target.querySelector('.arwes-text-field__input') as HTMLInputElement;

              animatedTextElement.style.opacity = '1';
              inputElement.style.opacity = '0';

              const text = inputElement.value || placeholder || '';

              if (text) {
                bleeps.type?.play();

                transitionerTextSimpleRef.current?.cancel();
                transitionerTextSimpleRef.current = createTransitionerTextSimple({
                  // If the text is too long, exit it quickly so the other elements
                  // don't disappear ant the text is left hanging alone.
                  duration: duration / 2,
                  text,
                  isEntering: false,
                  onChange: (newText: string): void => {
                    animatedTextElement.textContent = newText;
                  },
                  onComplete: () => {
                    bleeps.type?.stop();
                  }
                });
              }
            },
            exited: ({ target }) => {
              const animatedTextElement = target.querySelector('.arwes-text-field__animated-text') as HTMLDivElement;
              const inputElement = target.querySelector('.arwes-text-field__input') as HTMLInputElement;

              animatedTextElement.style.opacity = '0';
              inputElement.style.opacity = '0';
            }
          }
        ]}
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
            initialStyles: {
              opacity: 0
            },
            entered: ({ target }) => {
              if (autoFocus) {
                target.focus();
              }
            },
            exiting: ({ target }) => {
              target.blur();
            }
          }}
        />
        <div
          className='arwes-text-field__animated-text'
          css={styles.animatedText}
        />
        <Animated
          className='arwes-text-field__bg'
          css={styles.bg}
          animated={transitionOpacity}
        />
        {!hideLines &&
          <Animated
            className='arwes-text-field__line'
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
