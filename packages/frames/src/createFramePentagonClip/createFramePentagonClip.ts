interface CreateFramePentagonClipProps {
  squareSize?: number | string
  inverted?: boolean
}

const defaults: CreateFramePentagonClipProps = {};

const createFramePentagonClip = (props?: CreateFramePentagonClipProps): string => {
  const {
    squareSize = '16px',
    inverted
  } = props ?? defaults;

  const ss = typeof squareSize === 'number' ? `${squareSize}px` : squareSize;

  if (inverted) {
    return `polygon(
  0 0,
  100% 0,
  100% 100%,
  ${ss} 100%,
  0 calc(100% - ${ss})
)`;
  }

  return `polygon(
  0 0,
  100% 0,
  100% calc(100% - ${ss}),
  calc(100% - ${ss}) 100%,
  0 100%
)`;
};

export type { CreateFramePentagonClipProps };
export { createFramePentagonClip };
