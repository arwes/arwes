import type { FrameSVGPath, FrameSVGPathCommand, FrameSVGPathDimension } from '../types';

const formatDimension = (size: number, dimension: FrameSVGPathDimension): string => {
  if (typeof dimension === 'number') {
    return String(dimension);
  }

  const dimensionNumber = String(dimension)
    .trim()
    .replace(/- /g, '-')
    .replace(/\+ /g, '+')
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .reduce((total, item) => {
      const n = Number(item.replace(/[+\-%]/g, ''));

      if (n === 0) {
        return total;
      }

      const isMinus = item.startsWith('-');
      const isPercentage = item.endsWith('%');
      const value = isPercentage ? size * (n / 100) : n;

      return isMinus ? total - value : total + value;
    }, 0);

  return String(dimensionNumber);
};

const formatCommand = (width: number, height: number, command: FrameSVGPathCommand): string => {
  if (Array.isArray(command)) {
    const [name, ...dimensions] = command;

    // One dimension horizontal commands.
    if (name === 'H' || name === 'h') {
      return `${name} ${formatDimension(width, dimensions[0])}`;
    }

    // One dimension vertical commands.
    if (name === 'V' || name === 'v') {
      return `${name} ${formatDimension(height, dimensions[0])}`;
    }

    // Elliptical Arc Curve commands.
    if (name === 'A' || name === 'a') {
      const [rx, ry, angle, largeArcFlag, sweepFlag, x, y] = dimensions;
      const values = [
        formatDimension(width, rx),
        formatDimension(height, ry),
        angle,
        largeArcFlag,
        sweepFlag,
        formatDimension(width, x),
        formatDimension(height, y)
      ].join(',');

      return name + ' ' + values;
    }

    // Multiple (x,y)+ dimensions.
    const values = dimensions
      .map((dimension, index) => {
        const isEven = index % 2 === 0;
        const size = isEven ? width : height;
        return formatDimension(size, dimension);
      })
      .join(',');

    return name + ' ' + values;
  }

  // No dimensions commands.
  return command;
};

const formatFrameSVGPath = (width: number, height: number, path: FrameSVGPath): string => {
  return path
    .map((command) => formatCommand(width, height, command))
    .join(' ');
};

export { formatFrameSVGPath };
