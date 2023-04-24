interface CreateFrameOctagonClipProps {
  squareSize?: number | string
}

const defaults: CreateFrameOctagonClipProps = {};

const createFrameOctagonClip = (props?: CreateFrameOctagonClipProps): string => {
  const { squareSize = '16px' } = props ?? defaults;

  const ss = typeof squareSize === 'number' ? `${squareSize}px` : squareSize;

  return `polygon(
  0 ${ss},
  ${ss} 0,
  calc(100% - ${ss}) 0,
  100% ${ss},
  100% calc(100% - ${ss}),
  calc(100% - ${ss}) 100%,
  ${ss} 100%,
  0 calc(100% - ${ss})
)`;
};

export type { CreateFrameOctagonClipProps };
export { createFrameOctagonClip };
