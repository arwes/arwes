import { CSSProperties, ForwardedRef } from 'react';

export type DotsPropsOrigin = 'left' | 'right' | 'top' | 'bottom' | 'center' | [number, number];

export interface DotsProps {
  elementRef?: ForwardedRef<HTMLCanvasElement>
  className?: string
  style?: CSSProperties
  color: string
  type?: 'box' | 'circle'
  duration?: number
  distance?: number
  size?: number
  origin?: DotsPropsOrigin
};
