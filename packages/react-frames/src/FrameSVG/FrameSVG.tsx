import React, {
  type SVGProps,
  type ForwardedRef,
  type ReactElement,
  type CSSProperties,
  useRef,
  useEffect
} from 'react';
import { cx } from '@arwes/tools';
import { mergeRefs } from '@arwes/react-tools';
import {
  type FRAME_SVG_POLYLINE,
  type FRAME_SVG_POLYLINE_GENERIC,
  renderFrameSVGPolylines
} from '@arwes/frames';

interface FrameSVGProps extends SVGProps<SVGSVGElement> {
  polylines?: FRAME_SVG_POLYLINE_GENERIC[]
  onRender?: (svg: SVGSVGElement) => void
  className?: string
  style?: CSSProperties
  elementRef?: ForwardedRef<SVGSVGElement>
}

const emptyPolyline: FRAME_SVG_POLYLINE[] = [];

const FrameSVG = (props: FrameSVGProps): ReactElement => {
  const {
    polylines = emptyPolyline,
    onRender: onRenderExternal,
    className,
    style,
    elementRef,
    ...otherProps
  } = props;

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current as SVGSVGElement;

    const onRender = (): void => {
      const { width, height } = svg.getBoundingClientRect();
      renderFrameSVGPolylines(svg, width, height, polylines);

      onRenderExternal?.(svg);
    };

    // Resize only once initially and synchronously.
    onRender();

    // If ResizeObserver is available, allow rerenders on element resize.
    if (window.ResizeObserver) {
      let isFirstRender = true;
      const observer = new window.ResizeObserver(() => {
        // The observer triggers and initial observation call asynchronously,
        // but the first render was already executed before, so skip it.
        if (isFirstRender) {
          isFirstRender = false;
          return;
        }
        onRender();
      });
      observer.observe(svg);
      return () => observer.disconnect();
    }
  }, [onRenderExternal]);

  return (
    <svg
      ref={mergeRefs(svgRef, elementRef)}
      className={cx('arwes-react-frames-framesvg', className)}
      xmlns='http://www.w3.org/2000/svg'
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
        border: 0,
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        ...style
      }}
      {...otherProps}
    />
  );
};

export type { FrameSVGProps };
export { FrameSVG };
