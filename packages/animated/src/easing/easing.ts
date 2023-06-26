type EasingFn = (x: number) => number;

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const PI = Math.PI;
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;
const c4 = (2 * PI) / 3;
const c5 = (2 * PI) / 4.5;

const bounceOut = (x: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  }
  else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  }
  else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  }
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
};

const easing = {
  linear: (x: number): number => x,
  inQuad: (x: number): number => {
    return x * x;
  },
  outQuad: (x: number): number => {
    return 1 - (1 - x) * (1 - x);
  },
  inOutQuad: (x: number): number => {
    return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2;
  },
  inCubic: (x: number): number => {
    return x * x * x;
  },
  outCubic: (x: number): number => {
    return 1 - pow(1 - x, 3);
  },
  inOutCubic: (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
  },
  inQuart: (x: number): number => {
    return x * x * x * x;
  },
  outQuart: (x: number): number => {
    return 1 - pow(1 - x, 4);
  },
  inOutQuart: (x: number): number => {
    return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2;
  },
  inQuint: (x: number): number => {
    return x * x * x * x * x;
  },
  outQuint: (x: number): number => {
    return 1 - pow(1 - x, 5);
  },
  inOutQuint: (x: number): number => {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2;
  },
  inSine: (x: number): number => {
    return 1 - cos((x * PI) / 2);
  },
  outSine: (x: number): number => {
    return sin((x * PI) / 2);
  },
  inOutSine: (x: number): number => {
    return -(cos(PI * x) - 1) / 2;
  },
  inExpo: (x: number): number => {
    return x === 0 ? 0 : pow(2, 10 * x - 10);
  },
  outExpo: (x: number): number => {
    return x === 1 ? 1 : 1 - pow(2, -10 * x);
  },
  inOutExpo: (x: number): number => {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : x < 0.5
          ? pow(2, 20 * x - 10) / 2
          : (2 - pow(2, -20 * x + 10)) / 2;
  },
  inCirc: (x: number): number => {
    return 1 - sqrt(1 - pow(x, 2));
  },
  outCirc: (x: number): number => {
    return sqrt(1 - pow(x - 1, 2));
  },
  inOutCirc: (x: number): number => {
    return x < 0.5
      ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
      : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
  },
  inBack: (x: number): number => {
    return c3 * x * x * x - c1 * x * x;
  },
  outBack: (x: number): number => {
    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
  },
  inOutBack: (x: number): number => {
    return x < 0.5
      ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  inElastic: (x: number): number => {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
  },
  outElastic: (x: number): number => {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
  },
  inOutElastic: (x: number): number => {
    return x === 0
      ? 0
      : x === 1
        ? 1
        : x < 0.5
          ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
          : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1;
  },
  inBounce: (x: number): number => {
    return 1 - bounceOut(1 - x);
  },
  outBounce: bounceOut,
  inOutBounce: (x: number): number => {
    return x < 0.5
      ? (1 - bounceOut(1 - 2 * x)) / 2
      : (1 + bounceOut(2 * x - 1)) / 2;
  }
};

type Easing = EasingFn | keyof typeof easing;

export type { Easing, EasingFn };
export { easing };
