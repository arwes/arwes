import {
  type HTMLProps,
  type SVGProps,
  type CSSProperties,
  type ForwardedRef,
  type ReactNode,
  createElement,
  useRef,
  useMemo
} from 'react'

import type { NoInfer } from '@arwes/tools'
import { memo, mergeRefs } from '@arwes/react-tools'
import type { AnimatorNode } from '@arwes/animator'
import { useAnimator } from '@arwes/react-animator'
import { type AnimatedProp, formatAnimatedCSSPropsShorthands } from '@arwes/animated'

import { useAnimated } from '../useAnimated/index.js'

interface AnimatedProps<E extends HTMLElement | SVGElement = HTMLDivElement> {
  elementRef?: ForwardedRef<E>
  className?: string
  style?: CSSProperties
  animated?: AnimatedProp
  hideOnExited?: boolean
  hideOnEntered?: boolean
  onTransition?: (element: E, node: AnimatorNode) => void
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  children?: ReactNode
}

const AnimatedComponent = <
  E extends HTMLElement | SVGElement = HTMLDivElement,
  P = E extends HTMLElement ? HTMLProps<E> : SVGProps<E>
>(
  props: AnimatedProps<E> & NoInfer<P>
): JSX.Element => {
  const {
    as: asProvided,
    animated,
    className,
    style,
    elementRef: externalElementRef,
    hideOnExited = true,
    hideOnEntered,
    onTransition,
    ...otherProps
  } = props

  const animator = useAnimator()
  const as = useMemo(() => asProvided || 'div', [])
  const elementRef = useRef<E | null>(null)

  useAnimated(elementRef, animated, {
    renderInitials: false,
    hideOnExited,
    hideOnEntered,
    onTransition
  })

  const animatedSettingsListReceived = Array.isArray(animated) ? animated : [animated]
  const animatedSettingsList = animatedSettingsListReceived
    .map((item) => (typeof item === 'string' || Array.isArray(item) ? undefined : item))
    .filter(Boolean)

  let initialAttributes: object | undefined
  if (animator) {
    initialAttributes = animatedSettingsList
      .map((item) => item?.initialAttributes)
      .reduce<any>((total: object, item: object | undefined) => ({ ...total, ...item }), {})
  }

  let dynamicStyles: CSSProperties | undefined
  if (animator) {
    dynamicStyles = animatedSettingsList
      .map((item) => item?.initialStyle)
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
      visibility:
        animator &&
        ((hideOnExited && animator.node.state === 'exited') ||
          (hideOnEntered && animator.node.state === 'entered'))
          ? 'hidden'
          : '',
      ...dynamicStyles
    }
  })
}

export type { AnimatedProps }
export const Animated = memo(AnimatedComponent)
