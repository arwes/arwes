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
  name?: string
  style?: CSSProperties
  polyline: FRAME_SVG_POLYLINE
}

type FRAME_SVG_POLYLINE_GENERIC = FRAME_SVG_POLYLINE | FRAME_SVG_POLYLINE_CUSTOM;

interface FrameSVGProps extends SVGProps<SVGSVGElement> {
  polylines?: FRAME_SVG_POLYLINE_GENERIC[]
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGSVGElement>
}

const emptyPolyline: FRAME_SVG_POLYLINE[] = [];

const FrameSVG = (props: FrameSVGProps): ReactElement => {
  const {
    polylines = emptyPolyline,
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
      {hasSize && polylines.map((polylineCustom, index) => {
        const isPolyline = Array.isArray(polylineCustom);
        const polyline = isPolyline ? polylineCustom : polylineCustom.polyline;
        const style = isPolyline ? null : polylineCustom.style;
        const name = isPolyline ? null : polylineCustom.name;

        return (
          <path
            key={index}
            data-name={name}
            d={formatFrameSVGPolyline(width, height, polyline)}
            style={{
              vectorEffect: 'non-scaling-stroke',
              ...style
            }}
          />
        );
      })}
    </svg>
  );
};

export type { FRAME_SVG_POLYLINE_CUSTOM, FRAME_SVG_POLYLINE_GENERIC, FrameSVGProps };
export { FrameSVG };
