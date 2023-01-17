import type { TOScheduler } from '@arwes/tools';

export interface AnimatorControl {
  getSettings: () => AnimatorSettings
  setDynamicSettings: (settings: AnimatorSettings | null) => void
  getForeignRef: () => unknown
  setForeignRef: (ref: unknown) => void
}

export type AnimatorSystemNodeId = number;

export type AnimatorSystemNodeSubscriber = (node: AnimatorSystemNode) => void;

export interface AnimatorSystemNode {
  id: AnimatorSystemNodeId
  control: AnimatorControl
  parent?: AnimatorSystemNode
  children: Set<AnimatorSystemNode>
  subscribers: Set<AnimatorSystemNodeSubscriber>
  scheduler: TOScheduler
  context: Record<string, unknown>
  getState: () => string
  send: (action: string) => void
  onSettingsChange: () => void
}

export interface AnimatorSystem {
  setup: (control: AnimatorControl) => AnimatorSystemNode
  register: (parent: AnimatorSystemNode, control: AnimatorControl) => AnimatorSystemNode
  unregister: (node: AnimatorSystemNode) => void
}

export interface AnimatorSettingsMachine {
  initialState: string
  states: Record<string, {
    onEntry?: {
      execute?: (node: AnimatorSystemNode) => void
      schedule?: (node: AnimatorSystemNode) => { duration: number, action: string }
    }
    onActions?: Record<string, string>
  }>
  onCreate?: (node: AnimatorSystemNode) => void
  onSettingsChange?: (node: AnimatorSystemNode) => void
  onTransition?: (node: AnimatorSystemNode) => void
  onInitialTransition?: (node: AnimatorSystemNode) => void
}

export interface AnimatorSettings {
  machine?: AnimatorSettingsMachine
  duration?: Record<string, number>
  onTransition?: (node: AnimatorSystemNode) => void

  // TODO: Setup a way to configure extra settings.
  active?: boolean
  merge?: boolean
  // TODO: Custom manager function.
  manager?: string
  combine?: boolean
}

export interface AnimatorInterface {
  system: AnimatorSystem
  node: AnimatorSystemNode
}
