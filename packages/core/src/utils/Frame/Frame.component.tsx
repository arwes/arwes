/* @jsx jsx */
import {
  MutableRefObject,
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

import { NoInfer } from '../types';
import { transitionAppear, transitionDisappear } from '../appearTransitions';
import { AnimatedSettings, Animated } from '../Animated';

type FRAME_DIMENSION = number | string;
type FRAME_POINT = FRAME_DIMENSION[];
type FRAME_POLYLINE = FRAME_POINT[];
interface FRAME_POLYLINE_CUSTOM {
  polyline: FRAME_POLYLINE
  lineWidth?: number
  animated?: AnimatedSettings
  css?: CSSObject
}
type FRAME_POLYLINE_GENERIC = FRAME_POLYLINE | FRAME_POLYLINE_CUSTOM;

interface FRAME_EFFECTS {
  highlight: () => void
}

interface FrameProps <E> {
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  shapes?: FRAME_POLYLINE[]
  polylines?: FRAME_POLYLINE_GENERIC[]
  lineWidth?: number
  palette?: string
  hideShapes?: boolean
  hidePolylines?: boolean
  hover?: boolean
  disabled?: boolean
  className?: string
  rootRef?: MutableRefObject<E | null> | ((node: E) => void)
  effectsRef?: MutableRefObject<FRAME_EFFECTS | null> | ((effects: FRAME_EFFECTS) => void)
  children?: ReactNode
}

function Frame <E, P> (props: FrameProps<E> & NoInfer<P>): ReactElement {
  const {
    as: asProvided,
    shapes,
    polylines,
    lineWidth,
    hideShapes,
    hidePolylines,
    palette,
    hover,
    disabled,
    className,
    rootRef,
    effectsRef,
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
  const formatPoint = (point: FRAME_POINT): string => {
    const width = size.width - (blurPadding * 2);
    const height = size.height - (blurPadding * 2);

    return point
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
  const formatPolyline = (polyline: FRAME_POLYLINE): string => {
    return polyline
      .map(formatPoint)
      .map((point, index) => (index === 0 ? 'M' : 'L') + point)
      .join(' ');
  };

  useEffect(() => {
    const root = containerRef.current as HTMLDivElement;

    if (effectsRef) {
      const highlight = (): void => {
        const shapes = root.querySelectorAll('path[data-type=shape]');
        const startOpacity = hideShapes ? 0 : 0.1;
        const endOpacity = 0.5;

        anime
          .timeline({
            targets: shapes,
            duration: theme.transitionDuration() / 4,
            easing: 'easeOutSine'
          })
          .add({ opacity: [startOpacity, endOpacity] })
          .add({ opacity: [endOpacity, startOpacity] });
      };
      const effects = { highlight };

      if (typeof effectsRef === 'function') {
        effectsRef(effects);
      }
      else {
        effectsRef.current = effects;
      }
    }

    const onResize = (): void => {
      const { offsetWidth: width, offsetHeight: height } = root;
      setSize({ width, height });
    };

    // TODO: ResizeObserver class is not recoginized by TypeScript.
    const win: any = window;
    const ResizeObserver = win.ResizeObserver;

    if (ResizeObserver) {
      observerRef.current = new ResizeObserver(onResize);
      observerRef.current.observe(root);

      return () => observerRef.current?.disconnect();
    }
    else {
      // Resize only once initially.
      onResize();
    }
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
        '&:hover path[data-type=polyline], &:focus path[data-type=polyline]': hover && !disabled && {
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
          // Even if it is still resized automatically, in case there is a delay
          // or the ResizeObserver API is not available, the SVG should be resized.
          preserveAspectRatio='none'
          css={{
            display: 'block',
            flex: 1,
            transition: `filter ${theme.transitionDuration()}ms ease-out`,
            filter: `drop-shadow(0 0 ${blurPadding}px ${color})`
          }}
        >
          <Animated<SVGGElement, SVGProps<SVGGElement>>
            as='g'
            style={{ transform: `translate(${blurPadding}px, ${blurPadding}px)` }}
            // Hide polylines only when animations are EXITED.
            animated={{
              initialStyles: { opacity: 0 },
              entering: { opacity: 1, easing: () => (progress: number): number => progress ? 1 : 0 },
              exiting: { opacity: 0, easing: () => (progress: number): number => progress === 1 ? 1 : 0 }
            }}
          >
            <Animated<SVGGElement, SVGProps<SVGGElement>>
              as='g'
              animated={{
                initialStyles: { opacity: 0 },
                entering: transitionAppear,
                exiting: transitionDisappear
              }}
            >
              {(shapes || []).map((shape, index) => (
                <path
                  key={index}
                  data-type='shape'
                  d={formatPolyline(shape)}
                  css={{
                    strokeWidth: 0,
                    stroke: 'transparent',
                    fill: color,
                    opacity: hideShapes ? 0 : 0.1,
                    transition: `fill ${theme.transitionDuration()}ms ease-out`
                  }}
                />
              ))}
            </Animated>
            {!hidePolylines && (polylines || []).map((item, index) => {
              const polyline = Array.isArray(item) ? item : item.polyline;
              const strokeWidth = (item as any).lineWidth || lineWidth;
              const animated = (item as any).animated;
              const css = (item as any).css;

              return (
                <Animated<SVGPathElement, SVGProps<SVGPathElement>>
                  as='path'
                  key={index}
                  data-type='polyline'
                  d={formatPolyline(polyline)}
                  css={{
                    strokeWidth,
                    stroke: color,
                    vectorEffect: 'non-scaling-stroke',
                    fill: 'transparent',
                    transition: `stroke ${theme.transitionDuration()}ms ease-out`,
                    ...css
                  }}
                  // To set the stroke-dashoffset animation, the path total length
                  // is required. A trick to reset it is to set a (way) bigger value.
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
  lineWidth: PropTypes.number,
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
  lineWidth: 1,
  palette: 'primary'
};

export {
  FRAME_DIMENSION,
  FRAME_POINT,
  FRAME_POLYLINE,
  FRAME_POLYLINE_CUSTOM,
  FRAME_POLYLINE_GENERIC,
  FRAME_EFFECTS,
  FrameProps,
  Frame
};
