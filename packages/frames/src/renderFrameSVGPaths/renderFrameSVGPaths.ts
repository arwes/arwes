import type { FRAME_SVG_PATH_GENERIC } from '../types';
import { formatFrameSVGPath } from '../formatFrameSVGPath/index';

const renderFrameSVGPaths = (
  svgElement: SVGSVGElement,
  width: number,
  height: number,
  pathsCustom: FRAME_SVG_PATH_GENERIC[]
): void => {
  if (width <= 0 || height <= 0) {
    return;
  }

  svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const pathElementsCurrent = Array.from(svgElement.querySelectorAll('path'));

  for (let index = 0; index < pathsCustom.length; index++) {
    const pathCustom = pathsCustom[index];
    const pathElementCurrent = pathElementsCurrent[index];
    const pathElement = pathElementCurrent ?? document.createElementNS('http://www.w3.org/2000/svg', 'path');

    const isCommands = Array.isArray(pathCustom);
    const polyline = isCommands ? pathCustom : pathCustom.path;

    Object.assign(pathElement.style, {
      vectorEffect: 'non-scaling-stroke'
    });

    if (!isCommands) {
      const { name, id, className, style } = pathCustom;

      if (pathElement.dataset.name !== name) {
        pathElement.dataset.name = name;
      }

      if (pathElement.id !== id) {
        pathElement.id = id || '';
      }

      if (pathElement.classList.value !== className) {
        pathElement.classList.value = className || '';
      }

      Object.assign(pathElement.style, style);
    }

    pathElement.setAttribute('d', formatFrameSVGPath(width, height, polyline));

    svgElement.appendChild(pathElement);
  }

  // TODO: If the number of polygons change, remove the excess unneeded elements.
};

export { renderFrameSVGPaths };
