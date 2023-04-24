interface CreateFrameHexagonClipProps {
  squareSize?: number | string
  inverted?: boolean
}

const defaults: CreateFrameHexagonClipProps = {};

const createFrameHexagonClip = (props?: CreateFrameHexagonClipProps): string => {
  const {
    squareSize = '16px',
    inverted
  } = props ?? defaults;

  const ss = typeof squareSize === 'number' ? `${squareSize}px` : squareSize;

  if (inverted) {
    return `polygon(
  0 0,
  calc(100% - ${ss}) 0,
  100% ${ss},
  100% 100%,
  ${ss} 100%,
  0 calc(100% - ${ss})
)`;
  }

  return `polygon(
  0 100%,
  0 ${ss},
  ${ss} 0,
  100% 0,
  100% calc(100% - ${ss}),
  calc(100% - ${ss}) 100%
)`;
};

export { createFrameHexagonClip };
