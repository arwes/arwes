import type { AnimatedCSSProps, AnimatedXTransition } from '@arwes/animated'

type ContextType = Record<string, string>

export type FrameSettingsElementCommon<Contexts extends ContextType = ContextType> = {
  name?: string
  id?: string
  className?: string
  style?: AnimatedCSSProps
  contexts?: {
    [C in keyof Contexts]?: {
      [S in Contexts[C]]?: {
        className?: string
        style?: AnimatedCSSProps
        transition?: AnimatedXTransition
      }
    }
  }
}

export type FrameSettingsG<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'g'
    elements: Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsDefs<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'defs'
    elements: Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsClipPath<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'clipPath'
    elements: Array<FrameSettingsElement<Contexts>>
  }

export type FrameSettingsMask<Contexts extends ContextType = ContextType> =
  FrameSettingsElementCommon<Contexts> & {
    type: 'mask'
    elements: Array<FrameSettingsElement<Contexts>>
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
    path: FrameSettingsPathDefinition
    contexts?: {
      [C in keyof Contexts]?: {
        [S in Contexts[C]]?: {
          className?: string
          style?: AnimatedCSSProps
          transition?: AnimatedXTransition
          path?: FrameSettingsPathDefinition
        }
      }
    }
  }

export type FrameSettingsElement<Contexts extends ContextType = ContextType> =
  | FrameSettingsG<Contexts>
  | FrameSettingsDefs<Contexts>
  | FrameSettingsClipPath<Contexts>
  | FrameSettingsMask<Contexts>
  | FrameSettingsPath<Contexts>

export type FrameSettingsContexts<Contexts extends ContextType = ContextType> = {
  [C in keyof Contexts]: {
    initial: Contexts[C]
  }
}

export interface FrameSettings<Contexts extends ContextType = ContextType> {
  container?: SVGGElement
  elements: Array<FrameSettingsElement<Contexts>>
  contexts?: FrameSettingsContexts<Contexts>
}

type FrameTransition<
  Contexts extends ContextType = ContextType,
  C extends keyof Contexts = keyof Contexts,
  S extends Contexts[C] = Contexts[C]
> = (context: C, state: S) => void

export type Frame<Contexts extends ContextType = ContextType> = {
  transition: FrameTransition<Contexts>
  cancel: () => void
  remove: () => void
}
