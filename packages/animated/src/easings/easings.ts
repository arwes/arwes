export const easeOutCubic = (x: number): number =>
  1 - Math.pow(1 - x, 3);

export const easeInOutSine = (x: number): number =>
  -(Math.cos(Math.PI * x) - 1) / 2;

export const easeOutSine = (x: number): number =>
  Math.sin((x * Math.PI) / 2);

export const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
