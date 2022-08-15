import {
  HTMLProps,
  CSSProperties,
  ForwardedRef,
  ReactNode
} from 'react';

import type { AnimatedSettings } from '../types';

export interface AnimatedProps<E extends HTMLElement | SVGElement = HTMLDivElement, P = HTMLProps<E>> {
  elementRef?: ForwardedRef<E>
  className?: string
  style?: CSSProperties
  animated?: AnimatedSettings<P> | Array<AnimatedSettings<P>>
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  children?: ReactNode
}
