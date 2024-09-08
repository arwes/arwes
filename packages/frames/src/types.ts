import type { AnimatorNode } from '@arwes/animator'
import type { AnimatedProp, AnimatedCSSProps, AnimatedXAnimation } from '@arwes/animated'

type ContextType = Record<string, string>

export type FrameSettingsElementCommon<Contexts extends ContextType = ContextType> = {
  name?: string
  id?: string
  className?: string
  style?: AnimatedCSSProps
  animated?: AnimatedProp
  contexts?: {
    [C in keyof Contexts]?: {
      [S in Contexts[C]]?: {
        className?: string
        style?: AnimatedCSSProps
        animate?: AnimatedXAnimation
      }
    }
  }
}

export type FrameSettingsSVG<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'svg'
    viewBox: string
    x: number | string
    y: number | string
    width: number | string
    height: number | string
    elements: string | Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsG<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'g'
    elements: string | Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsDefs<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'defs'
    elements: string | Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsClipPath<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'clipPath'
    elements: string | Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsMask<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'mask'
    elements: string | Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsPathDimension = number | string
export type FrameSettingsPathCommandName =
  | 'M'
  | 'm'
  | 'L'
  | 'l'
  | 'H'
  | 'h'
  | 'V'
  | 'v'
  | 'C'
  | 'c'
  | 'S'
  | 's'
  | 'Q'
  | 'q'
  | 'T'
  | 't'
  | 'A'
  | 'a'
export type FrameSettingsPathCommand =
  | 'Z'
  | 'z'
  | [FrameSettingsPathCommandName, ...FrameSettingsPathDimension[]]
export type FrameSettingsPathDefinition = FrameSettingsPathCommand[]
export type FrameSettingsPath<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type?: 'path'
    path: string | FrameSettingsPathDefinition
    contexts?: {
      [C in keyof Contexts]?: {
        [S in Contexts[C]]?: {
          className?: string
          style?: AnimatedCSSProps
          animate?: AnimatedXAnimation
          path?: FrameSettingsPathDefinition
        }
      }
    }
  }

export type FrameSettingsElement<Contexts extends ContextType = ContextType> =
  | FrameSettingsSVG<Contexts>
  | FrameSettingsG<Contexts>
  | FrameSettingsDefs<Contexts>
  | FrameSettingsClipPath<Contexts>
  | FrameSettingsMask<Contexts>
  | FrameSettingsPath<Contexts>

export interface FrameSettings<Contexts extends ContextType = ContextType> {
  container?: SVGGElement
  elements: Array<FrameSettingsElement<Contexts>>
  contexts?: Contexts
  animator?: AnimatorNode
}

type FrameTransition<
  Contexts extends ContextType = ContextType,
  C extends keyof Contexts = keyof Contexts,
  S extends Contexts[C] = Contexts[C]
> = (context: C, state: S) => void

export type Frame<Contexts extends ContextType = ContextType> = {
  contexts: Contexts
  render: () => void
  transition: FrameTransition<Contexts>
  cancel: () => void
  remove: () => void
}
