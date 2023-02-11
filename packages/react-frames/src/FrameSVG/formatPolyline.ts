import type { FRAME_SVG_POINT, FRAME_SVG_POLYLINE } from './FrameSVG.types';

const formatPoint = (width: number, height: number, point: FRAME_SVG_POINT): string => {
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

const formatPolyline = (width: number, height: number, polyline: FRAME_SVG_POLYLINE): string => {
  return polyline
    .map(point => formatPoint(width, height, point))
    .map((point, index) => (index === 0 ? 'M' : 'L') + point)
    .join(' ');
};

export { formatPolyline };
