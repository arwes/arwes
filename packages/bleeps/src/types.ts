// BLEEP

export type BleepCategory =
  | 'background'
  | 'transition'
  | 'interaction'
  | 'notification';

export interface BleepGlobalProps {
  readonly volume?: number
}

export interface BleepGeneralProps {
  readonly preload?: boolean
  readonly volume?: number
  readonly fetchHeaders?: Headers
  readonly disabled?: boolean
}

export interface BleepProps extends Omit<BleepGeneralProps, 'disabled'> {
  readonly sources: Array<Readonly<{ src: string, type: string }>>
  readonly loop?: boolean
  readonly category?: BleepCategory
  readonly context?: AudioContext
  readonly globalGain?: GainNode
}

// TODO: Add support to allow updates on other bleep properties.
export interface BleepPropsUpdatable {
  readonly volume?: number
}

export interface Bleep {
  /**
   * Get audio duration in seconds.
   */
  readonly duration: number
  readonly isLoaded: boolean
  readonly isPlaying: boolean
  readonly play: (callerID?: string) => void
  readonly stop: (callerID?: string) => void
  readonly load: () => void
  readonly unload: () => void
  readonly update: (props: BleepPropsUpdatable) => void
}

// BLEEPS MANAGER

export interface BleepsManagerProps <BleepNames extends string = string> {
  readonly global?: BleepGlobalProps
  readonly common?: BleepGeneralProps
  readonly categories?: {
    readonly [P in BleepCategory]?: BleepGeneralProps
  }
  readonly bleeps: Record<BleepNames, Omit<BleepProps, 'context'>>
}

export interface BleepsManagerPropsGlobalUpdatable {
  readonly volume?: number
}

export interface BleepsManagerPropsGeneralUpdatable extends BleepPropsUpdatable {
  readonly disabled?: boolean
}

export interface BleepsManagerPropsBleepUpdatable extends BleepPropsUpdatable {
  readonly disabled?: boolean
}

export interface BleepsManagerPropsUpdatable <BleepNames extends string = string> {
  readonly global?: BleepsManagerPropsGlobalUpdatable
  readonly common?: BleepsManagerPropsGeneralUpdatable
  readonly categories?: {
    readonly [P in BleepCategory]?: BleepsManagerPropsGeneralUpdatable
  }
  readonly bleeps?: Record<BleepNames, BleepsManagerPropsBleepUpdatable>
}

export interface BleepsManager <BleepNames extends string = string> {
  readonly bleeps: Record<BleepNames, Bleep | null>
  readonly update: (props: BleepsManagerPropsUpdatable<BleepNames>) => void
}
