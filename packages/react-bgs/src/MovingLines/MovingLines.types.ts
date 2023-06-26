import type { CSSProperties, ForwardedRef } from 'react';

export interface MovingLinesProps {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
  lineWidth?: number
  lineColor?: string
  /**
   * Distance between each line.
   */
  distance?: number
  /**
   * Sets of lines per interval animation.
   */
  sets?: number
};

export interface MovingLinesLineConfig {
  distance: number
  positionsLength: number
  margin: number
  size: number
}

export interface MovingLinesLine {
  axis1: number
  axis2Initial: number
  length: number
}
