import { type RefObject, useEffect } from 'react';

const useFrameSVGRenderer = (
  svgRef: RefObject<SVGSVGElement>,
  onRenderExternal: ((svg: SVGSVGElement, width: number, height: number) => void)
): void => {
  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svg = svgRef.current;

    const onRender = (): void => {
      const { width, height } = svg.getBoundingClientRect();

      svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
      onRenderExternal?.(svg, width, height);
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
};

export { useFrameSVGRenderer };
