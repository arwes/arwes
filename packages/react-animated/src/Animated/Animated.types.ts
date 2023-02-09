import {
  type HTMLProps,
  type SVGProps,
  type CSSProperties,
  type ForwardedRef,
  type ReactNode
} from 'react';

import type { AnimatedSettings } from '../types';

export interface AnimatedProps<E extends HTMLElement | SVGElement = HTMLDivElement, P extends HTMLProps<HTMLElement> | SVGProps<SVGElement> = HTMLProps<HTMLDivElement>> {
  elementRef?: ForwardedRef<E>
  className?: string
  style?: CSSProperties
  animated?: AnimatedSettings<P> | Array<AnimatedSettings<P>>
  hideOnExited?: boolean
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  children?: ReactNode
}
