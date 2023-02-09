import type { TOScheduler } from '@arwes/tools';

export interface AnimatorControl {
  readonly getSettings: () => AnimatorSettings
  readonly setDynamicSettings: (settings: AnimatorSettingsPartial | null) => void
  readonly getDynamicSettings: () => AnimatorSettingsPartial | null
  readonly setForeignRef: (ref: unknown) => void
  readonly getForeignRef: () => unknown
}

export type AnimatorState =
  | 'entered'
  | 'entering'
  | 'exiting'
  | 'exited';

export type AnimatorAction =
  | 'setup'
  | 'enter'
  | 'enterEnd'
  | 'exit'
  | 'exitEnd'
  | 'update'
  | 'refresh';

export type AnimatorManagerName =
  | 'parallel'
  | 'stagger'
  | 'staggerReverse'
  | 'sequence'
  | 'sequenceReverse'
  | 'switch';

export type AnimatorSubscriber = (node: AnimatorNode) => void;

export interface AnimatorManager {
  readonly name: AnimatorManagerName
  readonly getDurationEnter: (childrenNodes?: AnimatorNode[]) => number
  readonly enterChildren: (childrenNodes?: AnimatorNode[]) => void
  readonly destroy?: () => void
}

export interface AnimatorNode {
  readonly id: string
  readonly control: AnimatorControl
  readonly parent?: AnimatorNode
  readonly children: Set<AnimatorNode>
  readonly subscribers: Set<AnimatorSubscriber>
  readonly scheduler: TOScheduler
  readonly duration: { enter: number, exit: number }
  readonly state: AnimatorState
  readonly subscribe: (subscriber: AnimatorSubscriber) => (() => void)
  readonly unsubscribe: (subscriber: AnimatorSubscriber) => void
  readonly send: (newAction: AnimatorAction) => void
  manager: AnimatorManager
}

export interface AnimatorSystem {
  readonly id: string
  readonly root: AnimatorNode | null
  readonly register: (parentNode: AnimatorNode | undefined | null, control: AnimatorControl) => AnimatorNode
  readonly unregister: (node: AnimatorNode) => void
}

export interface AnimatorDuration {
  enter: number
  exit: number
  delay: number
  offset: number
  stagger: number
  [duration: string]: number
}

export interface AnimatorSettings {
  active: boolean
  duration: AnimatorDuration
  manager: AnimatorManagerName
  merge: boolean
  combine: boolean
  initialState: 'exited' | 'entered'
  condition?: (node: AnimatorNode) => boolean
  onTransition?: (node: AnimatorNode) => void
}

// TODO: The duration type should only allow numeric values, otherwise they should
// not be present. Right now it allows `undefined` values which triggers errors.
export type AnimatorSettingsPartial = Partial<Omit<AnimatorSettings, 'duration'>> & {
  duration?: Partial<AnimatorDuration>
};

export interface AnimatorInterface {
  readonly system: AnimatorSystem
  readonly node: AnimatorNode
}
