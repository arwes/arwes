import type { TOScheduler } from '@arwes/tools';

export interface AnimatorControl {
  readonly getSettings: () => AnimatorSettings
  readonly setDynamicSettings?: (settings: AnimatorSettings | null) => void
  readonly getForeignRef?: () => unknown
  readonly setForeignRef?: (ref: unknown) => void
}

export type AnimatorState = 'entered' | 'entering' | 'exiting' | 'exited';

export type AnimatorAction = 'setup' | 'enter' | 'enterEnd' | 'exit' | 'exitEnd' | 'update';

export type AnimatorSubscriber = (node: AnimatorNode) => void;

export type AnimatorManagerName = 'parallel' | 'stagger' | 'sequence';

export interface AnimatorManager {
  readonly name: AnimatorManagerName
  readonly enterChildren: (childrenNodes: AnimatorNode[]) => void
}

export interface AnimatorNode {
  readonly id: string
  readonly control: AnimatorControl
  readonly parent?: AnimatorNode
  readonly children: Set<AnimatorNode>
  readonly subscribers: Set<AnimatorSubscriber>
  readonly scheduler: TOScheduler
  readonly manager: AnimatorManager
  readonly state: AnimatorState
  readonly send: (newAction: AnimatorAction) => void
}

export interface AnimatorSystem {
  readonly id: string
  readonly register: (parentNode: AnimatorNode | undefined, control: AnimatorControl) => AnimatorNode
  readonly unregister: (node: AnimatorNode) => void
}

export interface AnimatorDuration {
  enter: number
  exit: number
  delay: number
  offset: number
  stagger: number
  interval: number
  [duration: string]: number
}

export interface AnimatorSettings {
  active: boolean
  duration: AnimatorDuration
  manager: AnimatorManagerName
  merge: boolean
  combine: boolean
  onTransition?: (node: AnimatorNode) => void
}

export interface AnimatorInterface {
  readonly system: AnimatorSystem
  readonly node: AnimatorNode
}
