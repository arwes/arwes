import type { PartialDeep } from '@arwes/tools';

export type BleepCategory =
  | 'background'
  | 'transition'
  | 'interaction'
  | 'notification';

export interface BleepGeneralProps {
  readonly preload?: boolean
  readonly volume?: number
  readonly disabled?: boolean
}

export interface BleepProps extends Omit<BleepGeneralProps, 'disabled'> {
  readonly sources: Array<Readonly<{ src: string, type: string }>>
  readonly loop?: boolean
  readonly context?: AudioContext
  readonly category?: BleepCategory
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
}

export interface BleepsManagerProps <BleepNames extends string = string> {
  readonly common?: BleepGeneralProps
  readonly categories?: {
    readonly [P in BleepCategory]?: BleepGeneralProps
  }
  readonly bleeps: Record<BleepNames, Omit<BleepProps, 'context'>>
}

export interface BleepsManager <BleepNames extends string = string> {
  readonly bleeps: Record<BleepNames, Bleep | null>
  readonly update: (props: PartialDeep<BleepsManagerProps<BleepNames>>) => void
}
