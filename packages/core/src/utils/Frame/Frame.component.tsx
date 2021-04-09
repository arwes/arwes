/* @jsx jsx */
import {
  MutableRefObject,
  HTMLAttributes,
  FC,
  useRef,
  useState,
  useMemo,
  useEffect
} from 'react';
import { jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';

type PATH_TYPE = string | number;

// TODO: Set proper HTML element typings according to "as" prop value.
// For now, all animated elements are asumed to be DIV elements.
interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof HTMLElementTagNameMap
  forms?: PATH_TYPE[][][]
  lines?: PATH_TYPE[][][]
  outline?: number
  palette?: string
  shape?: boolean
  active?: boolean
  hover?: boolean
  disabled?: boolean
  rootRef?: MutableRefObject<HTMLDivElement | null> | ((node: HTMLDivElement) => void)
}

const Frame: FC<FrameProps> = props => {
  const {
    as: asProvided,
    forms,
    lines,
    outline,
    palette,
    shape,
    active,
    hover,
    disabled,
    className,
    rootRef,
    children,
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided || 'div', []);
  const theme = useTheme();
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const blurPadding = theme.shadowBlur(2);
  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[palette as string] ?? defaultPalette;
  const color = disabled ? colorPalette.dark2 : colorPalette.main;
  const colorHover = colorPalette.light2;

  const formatPathValue = (pair: PATH_TYPE[]): string => {
    const width = size.width - (blurPadding * 2);
    const height = size.height - (blurPadding * 2);

    return pair
      .slice(0, 2)
      .map((value, index) => {
        if (typeof value === 'number') {
          return value;
        }

        const isX = index === 0;
        const axisSize = isX ? width : height;

        return String(value)
          .trim()
          .replace(/ - /g, ' -')
          .replace(/ \+ /g, ' +')
          .split(' ')
          .reduce((total, item) => {
            const n = Number(item.replace(/[+\-%]/g, ''));

            if (n === 0) {
              return total;
            }

            const isMinus = item.startsWith('-');
            const isPercentage = item.endsWith('%');
            const point = isPercentage ? axisSize * (n / 100) : n;

            return isMinus ? total - point : total + point;
          }, 0);
      })
      .join(',');
  };
  const formatPath = (path: PATH_TYPE[][]): string => {
    return path
      .map(formatPathValue)
      .map((pair, index) => {
        if (index === 0) {
          return 'M' + pair;
        }
        return 'L' + pair;
      })
      .join(' ');
  };

  useEffect(() => {
    const root = containerRef.current as HTMLDivElement;
    const { offsetWidth: width, offsetHeight: height } = root;

    setSize({ width, height });
  }, []);

  return jsx(as,
    {
      ...otherProps,
      className: cx('arwes-frame', className),
      ref: rootRef,
      css: {
        position: 'relative',
        display: 'inline-block',
        padding: theme.space(2),

        '&:hover svg, &:focus svg': hover && !disabled && {
          filter: `drop-shadow(0 0 ${blurPadding}px ${colorHover})`
        },
        '&:hover path[data-type=form], &:focus path[data-type=form]': hover && !disabled && {
          fill: colorHover
        },
        '&:hover path[data-type=line], &:focus path[data-type=line]': hover && !disabled && {
          stroke: colorHover
        }
      }
    },
    <div
      ref={containerRef}
      className='arwes-frame__shape'
      css={{
        position: 'absolute',
        left: -blurPadding,
        right: -blurPadding,
        top: -blurPadding,
        bottom: -blurPadding,
        display: 'flex'
      }}
    >
      {!!size.width && !!size.height && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox={`0 0 ${size.width} ${size.height}`}
          preserveAspectRatio='none'
          css={{
            display: 'block',
            flex: 1,
            transition: `filter ${theme.transitionDuration()}ms ease-out`,
            filter: `drop-shadow(0 0 ${blurPadding}px ${color})`
          }}
        >
          <g style={{ transform: `translate(${blurPadding}px, ${blurPadding}px)` }}>
            {(forms || []).map((form, index) => (
              <path
                key={index}
                data-type='form'
                d={formatPath(form)}
                css={{
                  strokeWidth: 0,
                  stroke: 'transparent',
                  fill: color,
                  opacity: 0.2,
                  transition: `fill ${theme.transitionDuration()}ms ease-out`
                }}
              />
            ))}
            {(lines || []).map((line, index) => (
              <path
                key={index}
                data-type='line'
                d={formatPath(line)}
                css={{
                  vectorEffect: 'non-scaling-stroke',
                  strokeWidth: theme.outline(outline),
                  stroke: color,
                  fill: 'transparent',
                  transition: `stroke ${theme.transitionDuration()}ms ease-out`
                }}
              />
            ))}
          </g>
        </svg>
      )}
    </div>,
    <div
      className='arwes-frame__content'
      css={{ position: 'relative' }}
    >
      {children}
    </div>
  );
};

Frame.propTypes = {
  // @ts-expect-error
  as: PropTypes.string.isRequired,
  palette: PropTypes.string,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  shape: PropTypes.bool,
  outline: PropTypes.number,
  rootRef: PropTypes.any
};

Frame.defaultProps = {
  as: 'div',
  palette: 'primary',
  forms: [],
  lines: [],
  outline: 1
};

export { FrameProps, Frame };
