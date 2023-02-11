import React, { type ReactElement, useRef, useState, useEffect } from 'react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';

import type { FRAME_SVG_POLYLINE, FrameProps } from './FrameSVG.types';
import { formatPolyline } from './formatPolyline';

const emptyPolyline: FRAME_SVG_POLYLINE[] = [];

const FrameSVG = (props: FrameProps): ReactElement => {
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
            d={formatPolyline(width, height, polyline)}
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
            d={formatPolyline(width, height, polyline)}
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

export { FrameSVG };
