import { type DotsPropsOrigin } from './Dots.types';

const getDistanceBetweenTwoPoints = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

const getDistanceFromOriginToCornerProgress = (
  width: number,
  height: number,
  x1: number,
  y1: number,
  origin: DotsPropsOrigin
): number => {
  switch (origin) {
    case 'left': return x1 / width;
    case 'right': return 1 - x1 / width;
    case 'top': return y1 / height;
    case 'bottom': return 1 - y1 / height;
    case 'center': origin = [0.5, 0.5]; break;
  }

  const [x2Percentage, y2Percentage] = origin;
  const x2 = width * x2Percentage;
  const y2 = height * y2Percentage;
  const distanceFromOrigin = getDistanceBetweenTwoPoints(x1, y1, x2, y2);

  const x3 = x2 < width / 2 ? width : 0;
  const y3 = y2 < height / 2 ? height : 0;
  const maxDistanceToCorner = getDistanceBetweenTwoPoints(x2, y2, x3, y3);

  return distanceFromOrigin / maxDistanceToCorner;
};

export { getDistanceFromOriginToCornerProgress };
