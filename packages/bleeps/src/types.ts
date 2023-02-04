export type BleepCategory =
  | 'background'
  | 'transition'
  | 'interaction'
  | 'notification';

export interface BleepGeneralProps {
  readonly preload?: boolean
  readonly volume?: number
  readonly muted?: boolean
  readonly disabled?: boolean
  readonly category?: BleepCategory
}

export interface BleepProps extends BleepGeneralProps {
  readonly sources: Array<Readonly<{ src: string, type: string }>>
  readonly loop?: boolean
}

export interface Bleep {
  readonly play: (source?: string) => void
  readonly stop: (source?: string) => void
  readonly load: () => void
  readonly duration: number
  readonly isLoaded: boolean
  readonly isPlaying: boolean
  readonly props: BleepProps
}
