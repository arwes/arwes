import { CSSProperties, ForwardedRef } from 'react';

export interface PuffsProps {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
  color: string
  quantity: number
  interval?: number
  duration?: number
  margin?: number
  /** Position X offset fixed and variation values. */
  xOffset?: [number, number]
  /** Position Y offset fixed and variation values. */
  yOffset?: [number, number]
  /** Radius initial value. */
  radiusInitial?: number
  /** Radius offset fixed and variation values. */
  radiusOffset?: [number, number]
};
