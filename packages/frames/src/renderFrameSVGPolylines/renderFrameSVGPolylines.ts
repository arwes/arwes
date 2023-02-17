import type { FRAME_SVG_POLYLINE_GENERIC } from '../types';
import { formatFrameSVGPolyline } from '../formatFrameSVGPolyline/index';

const renderFrameSVGPolylines = (
  svgElement: SVGSVGElement,
  width: number,
  height: number,
  polylinesCustom: FRAME_SVG_POLYLINE_GENERIC[]
): void => {
  if (width <= 0 || height <= 0) {
    return;
  }

  svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const pathElementsCurrent = Array.from(svgElement.querySelectorAll('path'));

  for (let index = 0; index < polylinesCustom.length; index++) {
    const polylineCustom = polylinesCustom[index];
    const pathElementCurrent = pathElementsCurrent[index];
    const pathElement = pathElementCurrent ?? document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const isPolyline = Array.isArray(polylineCustom);
    const polyline = isPolyline ? polylineCustom : polylineCustom.polyline;

    Object.assign(pathElement.style, {
      vectorEffect: 'non-scaling-stroke'
    });

    if (!isPolyline) {
      const { name, className, style } = polylineCustom;

      if (pathElement.dataset.name !== name) {
        pathElement.dataset.name = name;
      }

      if (pathElement.classList.value !== className) {
        pathElement.classList.value = className || '';
      }

      Object.assign(pathElement.style, style);
    }

    pathElement.setAttribute('d', formatFrameSVGPolyline(width, height, polyline));

    svgElement.appendChild(pathElement);
  }

  // TODO: If the number of polygons change, remove the excess unneeded elements.
};

export { renderFrameSVGPolylines };
