import type { CSSProperties, ForwardedRef } from 'react';

export type DotsPropsOrigin = 'left' | 'right' | 'top' | 'bottom' | 'center' | [number, number];

export interface DotsProps {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
  /**
   * Dot color.
   */
  color?: string
  /**
   * Shape of the dot.
   */
  type?: 'box' | 'circle'
  /**
   * Distance between each dot center in pixels.
   */
  distance?: number
  /**
   * Dot size in pixels.
   */
  size?: number
  /**
   * Rectangle container axis or point [x, y] as percentages of the rectangle
   * dimensions from 0 (0%) to 1 (100%).
   * @example
   * [0.2, 0.8] is x=20% and y=80% as origin.
   */
  origin?: DotsPropsOrigin
  /**
   * Invert the animation to work "to origin" point instead "from origin" point.
   */
  originInverted?: boolean
};
