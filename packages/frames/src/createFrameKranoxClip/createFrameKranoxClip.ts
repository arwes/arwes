interface CreateFrameKranoxClipProps {
  squareSize?: number | string
  padding?: number | string
  strokeWidth?: number | string
  smallLineLength?: number | string
  largeLineLength?: number | string
}

type Point = [number | string, number | string];

const toCSSSize = (val: number | string): string => typeof val === 'number' ? `${val}px` : val;

const createFrameKranoxClip = (props?: CreateFrameKranoxClipProps): string => {
  const {
    squareSize = '16px',
    strokeWidth = '1px',
    smallLineLength = '16px',
    largeLineLength = '64px',
    padding = '0px'
  } = props ?? {};

  const p = toCSSSize(padding);
  const ss = toCSSSize(squareSize);
  const so = `calc(${toCSSSize(strokeWidth)} / 2)`; // Stroke offset.
  const sll = toCSSSize(smallLineLength);
  const lll = toCSSSize(largeLineLength);

  const lines: Point[] = [
    // Left-bottom.
    [`${so} + ${p} + calc(${ss} * 2)`, `100% - calc(${so} + ${p})`],
    [`${so} + ${p} + ${ss}`, `100% - calc(${so} + ${p} + ${ss})`],
    // Left.
    [`${so} + ${p} + ${ss}`, `${so} + ${p} + ${lll} + calc(${ss} * 3) + ${sll}`],
    [`${so} + ${p}`, `${so} + ${p} + ${lll} + calc(${ss} * 2) + ${sll}`],
    [`${so} + ${p}`, `${so} + ${p} + calc(${ss} * 2) + ${sll}`],
    [`${so} + ${p} + ${ss}`, `${so} + ${p} + ${sll} + ${ss}`],
    // Left-top.
    [`${so} + ${p} + ${ss}`, `${so} + ${p} + ${ss}`],
    [`${so} + ${p} + calc(${ss} * 2)`, `${so} + ${p}`],
    // Right-top.
    [`100% - calc(${so} + ${p} + calc(${ss} * 2))`, `${so} + ${p}`],
    [`100% - calc(${so} + ${p} + ${ss})`, `${so} + ${p} + ${ss}`],
    // Right.
    [`100% - calc(${so} + ${p} + ${ss})`, `100% - calc(${so} + ${p} + calc(${ss} * 3) + ${sll} + ${lll})`],
    [`100% - calc(${so} + ${p})`, `100% - calc(${so} + ${p} + calc(${ss} * 2) + ${sll} + ${lll})`],
    [`100% - calc(${so} + ${p})`, `100% - calc(${so} + ${p} + calc(${ss} * 2) + ${sll})`],
    [`100% - calc(${so} + ${p} + ${ss})`, `100% - calc(${so} + ${p} + ${ss} + ${sll})`],
    // Right-bottom.
    [`100% - calc(${so} + ${p} + ${ss})`, `100% - calc(${so} + ${p} + ${ss})`],
    [`100% - calc(${so} + ${p} + calc(${ss} * 2))`, `100% - calc(${so} + ${p})`]
  ];

  return `polygon(\n  ${lines.map(([x, y]) => `calc(${x}) calc(${y})`).join(',\n  ')}\n)`;
};

export type { CreateFrameKranoxClipProps };
export { createFrameKranoxClip };
