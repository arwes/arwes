// BLEEP

export type BleepCategory =
  | 'background'
  | 'transition'
  | 'interaction'
  | 'notification';

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
  readonly masterGain?: GainNode
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

export interface BleepMasterProps {
  readonly volume?: number
}

export interface BleepsManagerProps <Names extends string = string> {
  readonly master?: BleepMasterProps
  readonly common?: BleepGeneralProps
  readonly categories?: {
    readonly [P in BleepCategory]?: BleepGeneralProps
  }
  readonly bleeps: Record<Names, Omit<BleepProps, 'context' | 'masterGain'>>
}

export interface BleepsManagerPropsMasterUpdatable {
  readonly volume?: number
}

export interface BleepsManagerPropsGeneralUpdatable extends BleepPropsUpdatable {
  readonly disabled?: boolean
}

export interface BleepsManagerPropsBleepUpdatable extends BleepPropsUpdatable {
  readonly disabled?: boolean
}

export interface BleepsManagerPropsUpdatable <Names extends string = string> {
  readonly master?: BleepsManagerPropsMasterUpdatable
  readonly common?: BleepsManagerPropsGeneralUpdatable
  readonly categories?: {
    readonly [P in BleepCategory]?: BleepsManagerPropsGeneralUpdatable
  }
  readonly bleeps?: Record<Names, BleepsManagerPropsBleepUpdatable>
}

export interface BleepsManager <Names extends string = string> {
  readonly bleeps: Record<Names, Bleep | null>
  readonly unload: () => void
  readonly update: (props: BleepsManagerPropsUpdatable<Names>) => void
}
