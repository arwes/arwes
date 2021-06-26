/* @jsx jsx */
import {
  HTMLProps,
  MutableRefObject,
  CSSProperties,
  ReactNode,
  ReactElement,
  FormEvent,
  useMemo,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import { jsx, useTheme } from '@emotion/react';
import { useBleeps } from '@arwes/bleeps';
import { Animated, transitionOpacity } from '@arwes/animated';

import { generateStyles } from './Checkbox.styles';

// TODO: [PRIORITY:LOW] Add support for "indeterminate" value.
// TODO: [PRIORITY:LOW] Add support for right-to-left layout.

interface CheckboxProps {
  name?: string
  autoFocus?: boolean
  readOnly?: boolean
  required?: boolean
  disabled?: boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (event: FormEvent<HTMLInputElement>) => void
  inputProps?: HTMLProps<HTMLInputElement>
  palette?: string
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
  children?: ReactNode
}

const Checkbox = (props: CheckboxProps): ReactElement => {
  const {
    name,
    autoFocus,
    readOnly,
    required,
    disabled,
    defaultChecked,
    checked,
    onChange,
    inputProps,
    palette,
    className,
    style,
    rootRef,
    children
  } = props;

  const theme = useTheme();
  const bleeps = useBleeps();

  const styles = useMemo(
    () => generateStyles(theme, { disabled, readOnly, palette }),
    [theme, disabled, readOnly, palette]
  );

  const onChangeProxy = useCallback((event: FormEvent<HTMLInputElement>) => {
    if (readOnly) {
      event.currentTarget.checked = !event.currentTarget.checked;
      return;
    }

    onChange?.(event);

    bleeps.toggle?.play();
  }, [readOnly, onChange]);

  const decoAnimated = {
    initialStyles: { scale: 0 },
    entering: { scale: 1 },
    exiting: { scale: 0 }
  };

  return (
    <div
      className={cx('arwes-checkbox', className)}
      css={styles.root}
      style={style}
      ref={rootRef}
    >
      <Animated<HTMLLabelElement>
        as='label'
        className='arwes-checkbox__container'
        css={styles.container}
        animated={{
          initialStyles: { translateX: theme.space() },
          entering: { translateX: 0 },
          exiting: { translateX: theme.space() }
        }}
      >
        <div
          className='arwes-checkbox__shapes'
          css={styles.shapes}
        >
          <Animated<HTMLInputElement>
            name={name}
            autoFocus={autoFocus}
            readOnly={readOnly}
            required={required}
            disabled={disabled}
            tabIndex={readOnly ? -1 : 0}
            {...inputProps}
            as='input'
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={onChangeProxy}
            type='checkbox'
            className={cx('arwes-checkbox__input', inputProps?.className)}
            css={styles.input}
            animated={{
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
          <Animated className='arwes-checkbox__bg' css={styles.bg} animated={decoAnimated} />
          <Animated className='arwes-checkbox__box' css={[styles.box, styles.boxLT]} animated={decoAnimated} />
          <Animated className='arwes-checkbox__box' css={[styles.box, styles.boxLB]} animated={decoAnimated} />
          <Animated className='arwes-checkbox__box' css={[styles.box, styles.boxRT]} animated={decoAnimated} />
          <Animated className='arwes-checkbox__box' css={[styles.box, styles.boxRB]} animated={decoAnimated} />
          <Animated className='arwes-checkbox__mark' css={styles.mark} animated={transitionOpacity} />
        </div>
        {!!children && (
          <div className='arwes-checkbox__content' css={styles.content}>
            {children}
          </div>
        )}
      </Animated>
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  inputProps: PropTypes.object,
  palette: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  rootRef: PropTypes.any,
  children: PropTypes.any
};

export { CheckboxProps, Checkbox };
