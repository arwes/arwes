interface CreateFrameOctagonClipProps {
  squareSize?: number | string
  leftTop?: boolean
  leftBottom?: boolean
  rightTop?: boolean
  rightBottom?: boolean
}

const createFrameOctagonClip = (props?: CreateFrameOctagonClipProps): string => {
  const {
    squareSize = '16px',
    leftTop = true,
    leftBottom = true,
    rightTop = true,
    rightBottom = true
  } = props ?? {};

  const ss = typeof squareSize === 'number' ? `${squareSize}px` : squareSize;

  const leftTopPoints = leftTop
    ? `0 ${ss},
${ss} 0,`
    : '0 0,';

  const rightTopPoints = rightTop
    ? `calc(100% - ${ss}) 0,
100% ${ss},`
    : '100% 0,';

  const rightBottomPoints = rightBottom
    ? `100% calc(100% - ${ss}),
calc(100% - ${ss}) 100%,`
    : '100% 100%,';

  const leftBottomPoints = leftBottom
    ? `${ss} 100%,
0 calc(100% - ${ss})`
    : '0 100%';

  return `polygon(
${leftTopPoints}
${rightTopPoints}
${rightBottomPoints}
${leftBottomPoints}
)`;
};

export type { CreateFrameOctagonClipProps };
export { createFrameOctagonClip };
