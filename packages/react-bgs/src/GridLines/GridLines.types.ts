import type { CSSProperties, ForwardedRef } from 'react';

export interface GridLinesProps {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
  lineWidth?: number
  lineColor?: string
  horizontalLineDash?: number[]
  verticalLineDash?: number[]
  /**
   * Distance between each line.
   */
  distance?: number
};
