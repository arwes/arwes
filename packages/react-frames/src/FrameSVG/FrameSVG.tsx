import React, {
  type SVGProps,
  type ForwardedRef,
  type ReactElement,
  type CSSProperties,
  useRef,
  useState,
  useEffect
} from 'react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import { type FRAME_SVG_POLYLINE, formatFrameSVGPolyline } from '@arwes/frames';

interface FRAME_SVG_POLYLINE_CUSTOM {
  polyline: FRAME_SVG_POLYLINE
  style?: CSSProperties
}

type FRAME_SVG_POLYLINE_GENERIC = FRAME_SVG_POLYLINE | FRAME_SVG_POLYLINE_CUSTOM;

interface FrameSVGProps extends SVGProps<SVGSVGElement> {
  shapes?: FRAME_SVG_POLYLINE_GENERIC[]
  shapesStyle?: CSSProperties
  polylines?: FRAME_SVG_POLYLINE_GENERIC[]
  polylinesStyle?: CSSProperties
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGSVGElement>
}

const emptyPolyline: FRAME_SVG_POLYLINE[] = [];

const FrameSVG = (props: FrameSVGProps): ReactElement => {
  const {
    shapes = emptyPolyline,
    shapesStyle,
    polylines = emptyPolyline,
    polylinesStyle,
    className,
    style,
    elementRef: externalElementRef,
    ...otherProps
  } = props;

  const elementRef = useRef<SVGSVGElement>(null);
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });

  const hasSize = width > 0 && height > 0;

  useEffect(() => {
    const element = elementRef.current as SVGSVGElement;

    const onResize = (): void => {
      const { width, height } = element.getBoundingClientRect();
      setSize({ width, height });
    };

    if (window.ResizeObserver) {
      const observer = new window.ResizeObserver(onResize);
      observer.observe(element);
      return () => observer.disconnect();
    }
    else {
      // Resize only once initially.
      onResize();
    }
  }, []);

  return (
    <svg
      ref={mergeRefs(elementRef, externalElementRef)}
      className={cx('arwes-react-core-framesvg', className)}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${width} ${height}`}
      // Even if it is still resized automatically, in case there is a delay
      // or the ResizeObserver API is not available, the SVG should be resized.
      preserveAspectRatio='none'
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'block',
        width: '100%',
        height: '100%',
        ...style
      }}
      {...otherProps}
    >
      {hasSize && shapes.map((polylineCustom, index) => {
        const isPolyline = Array.isArray(polylineCustom);
        const polyline = isPolyline ? polylineCustom : polylineCustom.polyline;
        const style = isPolyline ? null : polylineCustom.style;

        return (
          <path
            key={index}
            data-type='shape'
            d={formatFrameSVGPolyline(width, height, polyline)}
            style={{
              strokeWidth: 0,
              stroke: 'transparent',
              fill: 'currentColor',
              ...shapesStyle,
              ...style
            }}
          />
        );
      })}
      {hasSize && polylines.map((polylineCustom, index) => {
        const isPolyline = Array.isArray(polylineCustom);
        const polyline = isPolyline ? polylineCustom : polylineCustom.polyline;
        const style = isPolyline ? null : polylineCustom.style;

        return (
          <path
            key={index}
            data-type='polyline'
            d={formatFrameSVGPolyline(width, height, polyline)}
            style={{
              vectorEffect: 'non-scaling-stroke',
              strokeWidth: 1,
              stroke: 'currentColor',
              fill: 'transparent',
              ...polylinesStyle,
              ...style
            }}
          />
        );
      })}
    </svg>
  );
};

export type { FrameSVGProps };
export { FrameSVG };
