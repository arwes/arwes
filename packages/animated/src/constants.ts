import { CSSProperties, HTMLProps } from 'react';

export interface AnimatedCSSPropsShorthands {
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  perspective?: number | string
  rotate?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  skew?: number | string
  skewX?: number | string
  skewY?: number | string
  scale?: number | string
  scaleX?: number | string
  scaleY?: number | string
  scaleZ?: number | string
}

export type AnimatedCSSProps = CSSProperties & AnimatedCSSPropsShorthands;

export interface AnimatedSettingsTransitionFunctionParams {
  targets: anime.AnimeAnimParams['targets']
  duration: number
  delay?: number
}

export type AnimatedSettingsTransitionFunction = (params: AnimatedSettingsTransitionFunctionParams) => void;

// TODO: Use a stronger typing for anime parameters instead of "anime.AnimeParams".
export type AnimatedSettingsTransitionTypes = AnimatedSettingsTransitionFunction | anime.AnimeParams;

export type AnimatedSettingsTransition = AnimatedSettingsTransitionTypes | AnimatedSettingsTransitionTypes[];

export interface AnimatedSettings <P = HTMLProps<HTMLElement>> {
  initialAttributes?: P
  initialStyles?: AnimatedCSSProps
  entering?: AnimatedSettingsTransition
  exiting?: AnimatedSettingsTransition
}
