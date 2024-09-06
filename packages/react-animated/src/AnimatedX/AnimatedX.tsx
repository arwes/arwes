import {
  type HTMLProps,
  type SVGProps,
  type CSSProperties,
  type ReactElement,
  type ForwardedRef,
  type ReactNode,
  createElement,
  useRef,
  useMemo
} from 'react'

import type { NoInfer } from '@arwes/tools'
import { mergeRefs } from '@arwes/react-tools'
import {
  type AnimatedSettings,
  type AnimatedXProp,
  formatAnimatedCSSPropsShorthands
} from '@arwes/animated'

import { useAnimatedX } from '../useAnimatedX/index.js'

interface AnimatedXProps<S extends string, E extends HTMLElement | SVGElement = HTMLDivElement> {
  elementRef?: ForwardedRef<E>
  className?: string
  style?: CSSProperties
  state: S | undefined | null
  hideOnStates?: S[]
  animated?: AnimatedXProp<S>
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  children?: ReactNode
}

const AnimatedX = <
  S extends string,
  E extends HTMLElement | SVGElement = HTMLDivElement,
  P = E extends HTMLElement ? HTMLProps<E> : SVGProps<E>
>(
  props: AnimatedXProps<S, E> & NoInfer<P>
): ReactElement => {
  const {
    as: asProvided,
    state: animatedState,
    hideOnStates = [],
    animated,
    className,
    style,
    elementRef: externalElementRef,
    ...otherProps
  } = props

  const hasState = animatedState !== undefined && animatedState !== null
  const as = useMemo(() => asProvided || 'div', [])
  const elementRef = useRef<E | null>(null)

  useAnimatedX<S, E>(animatedState, elementRef, animated, { renderInitials: false, hideOnStates })

  const animatedSettingsListReceived = Array.isArray(animated) ? animated : [animated]
  const animatedSettingsList = animatedSettingsListReceived.filter(Boolean) as AnimatedSettings[]

  let initialAttributes: object | undefined
  if (hasState) {
    initialAttributes = animatedSettingsList
      .map((item) => item?.initialAttributes)
      .reduce<any>((total: object, item: object | undefined) => ({ ...total, ...item }), {})
  }

  let dynamicStyles: CSSProperties | undefined
  if (hasState) {
    dynamicStyles = animatedSettingsList
      .map((item) => item.initialStyle)
      .filter(Boolean)
      .map((styles) => formatAnimatedCSSPropsShorthands(styles!))
      .reduce((total, item) => ({ ...total, ...item }), {})
  }

  return createElement(as, {
    ...otherProps,
    ...initialAttributes,
    ref: mergeRefs(externalElementRef, elementRef),
    className,
    style: {
      ...style,
      visibility: hasState && hideOnStates.includes(animatedState) ? 'hidden' : '',
      ...dynamicStyles
    }
  })
}

export type { AnimatedXProps }
export { AnimatedX }
