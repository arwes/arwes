/* @jsx jsx */
import {
  MutableRefObject,
  HTMLAttributes,
  SVGProps,
  ReactElement,
  ReactNode,
  useRef,
  useState,
  useMemo,
  useEffect
} from 'react';
import { CSSObject, jsx, useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import { cx } from '@emotion/css';
import anime from 'animejs';

import { transitionAppear, transitionDisappear } from '../appearTransitions';
import { AnimatedSettings, Animated } from '../Animated';

type FRAME_POINT = string | number;
type FRAME_LINE = FRAME_POINT[];
type FRAME_POLYLINE = FRAME_LINE[] | {
  lines: FRAME_LINE[]
  outline?: number
  animated?: AnimatedSettings
  css?: CSSObject
};

interface FrameProps <E = HTMLDivElement> {
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  shapes?: FRAME_POINT[][][]
  polylines?: FRAME_POLYLINE[]
  outline?: number
  palette?: string
  hideShapes?: boolean
  hidePolylines?: boolean
  hover?: boolean
  disabled?: boolean
  className?: string
  rootRef?: MutableRefObject<E | null> | ((node: E) => void)
  children?: ReactNode
}

function Frame <E = HTMLDivElement, P = HTMLAttributes<E>> (props: FrameProps<E> & P): ReactElement {
  const {
    as: asProvided,
    shapes,
    polylines,
    outline,
    hideShapes,
    hidePolylines,
    palette,
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
  const observerRef = useRef<any>(null);

  const blurPadding = theme.shadowBlur(2);
  const defaultPalette = theme.palette.primary;
  const colorPalette = theme.palette[palette as string] ?? defaultPalette;
  const color = disabled ? colorPalette.dark2 : colorPalette.main;
  const colorHover = colorPalette.light2;

  // TODO: Modularize functionalities.
  const formatLine = (line: FRAME_LINE): string => {
    const width = size.width - (blurPadding * 2);
    const height = size.height - (blurPadding * 2);

    return line
      .slice(0, 2)
      .map((value, index) => {
        if (typeof value === 'number') {
          return value;
        }

        const isX = index === 0;
        const axisSize = isX ? width : height;

        return String(value)
          .trim()
          .replace(/- /g, ' -')
          .replace(/\+ /g, ' +')
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
  const formatLines = (lines: FRAME_LINE[]): string => {
    return lines
      .map(formatLine)
      .map((point, index) => (index === 0 ? 'M' : 'L') + point)
      .join(' ');
  };

  useEffect(() => {
    const root = containerRef.current as HTMLDivElement;

    const onResize = (): void => {
      const { offsetWidth: width, offsetHeight: height } = root;
      setSize({ width, height });
    };

    // TODO: ResizeObserver interface is not recoginized by TypeScript.
    const win: any = window;
    observerRef.current = new win.ResizeObserver(onResize);
    observerRef.current.observe(root);

    return () => observerRef.current?.disconnect();
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
        '&:hover path[data-type=shape], &:focus path[data-type=shape]': hover && !disabled && {
          fill: colorHover
        },
        '&:hover path[data-type=line], &:focus path[data-type=line]': hover && !disabled && {
          stroke: colorHover
        }
      }
    },
    <div
      ref={containerRef}
      className='arwes-frame__structure'
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
          <Animated
            as='g'
            style={{ transform: `translate(${blurPadding}px, ${blurPadding}px)` }}
            animated={{
              entering: { opacity: 1, easing: () => (progress: number): number => progress ? 1 : 0 },
              exiting: { opacity: 0, easing: () => (progress: number): number => progress === 1 ? 1 : 0 }
            }}
          >
            <Animated
              as='g'
              animated={{
                initialStyles: { opacity: 0 },
                entering: transitionAppear,
                exiting: transitionDisappear
              }}
            >
              {!hideShapes && (shapes || []).map((shape, index) => (
                <path
                  key={index}
                  data-type='shape'
                  d={formatLines(shape)}
                  css={{
                    strokeWidth: 0,
                    stroke: 'transparent',
                    fill: color,
                    opacity: 0.1,
                    transition: `fill ${theme.transitionDuration()}ms ease-out`
                  }}
                />
              ))}
            </Animated>
            {!hidePolylines && (polylines || []).map((polyline, index) => {
              const lines = Array.isArray(polyline) ? polyline : polyline.lines;
              const strokeWidth = (polyline as any).outline || outline;
              const animated = (polyline as any).animated;
              const css = (polyline as any).css;

              return (
                <Animated<SVGPathElement, SVGProps<SVGPathElement>>
                  as='path'
                  key={index}
                  data-type='line'
                  d={formatLines(lines)}
                  css={{
                    strokeWidth,
                    stroke: color,
                    vectorEffect: 'non-scaling-stroke',
                    fill: 'transparent',
                    transition: `stroke ${theme.transitionDuration()}ms ease-out`,
                    ...css
                  }}
                  animated={animated || {
                    initialAttributes: { strokeDasharray: 999999 },
                    initialStyles: { strokeDashoffset: 999999 },
                    entering: { strokeDashoffset: [anime.setDashoffset, 0] },
                    exiting: { strokeDashoffset: [0, anime.setDashoffset] }
                  }}
                />
              );
            })}
          </Animated>
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
  as: PropTypes.string.isRequired,
  shapes: PropTypes.array,
  polylines: PropTypes.array,
  outline: PropTypes.number,
  palette: PropTypes.string,
  hideShapes: PropTypes.bool,
  hidePolylines: PropTypes.bool,
  hover: PropTypes.bool,
  disabled: PropTypes.bool,
  rootRef: PropTypes.any
};

Frame.defaultProps = {
  as: 'div',
  shapes: [],
  polylines: [],
  outline: 1,
  palette: 'primary'
};

export {
  FRAME_POINT,
  FRAME_LINE,
  FRAME_POLYLINE,
  FrameProps,
  Frame
};
