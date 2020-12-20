export const ENTERING = 'entering';
export const ENTERED = 'entered';
export const EXITING = 'exiting';
export const EXITED = 'exited';

export const PARALLEL = 'parallel';
export const SEQUENCE = 'sequence';
export const STAGGER = 'stagger';

export type AnimatorFlowValue = typeof ENTERING | typeof ENTERED | typeof EXITING | typeof EXITED;

export interface AnimatorFlow {
  value: AnimatorFlowValue
  [ENTERING]?: boolean
  [ENTERED]?: boolean
  [EXITING]?: boolean
  [EXITED]?: boolean
  hasEntered?: boolean
  hasExited?: boolean
}

export interface AnimatorSettingsDuration {
  enter?: number
  exit?: number
  stagger?: number
  delay?: number
  offset?: number
}

export interface AnimatorDuration {
  enter: number
  exit: number
  stagger: number
  delay: number
  offset: number
}

export interface AnimatorGeneralSettings {
  duration?: AnimatorSettingsDuration
}

export interface AnimatorRefChild {
  id: number
  getDuration: () => AnimatorDuration
  getIsMerge: () => boolean
  setActivate: () => void
}

export interface AnimatorChildrenActivationsTimes {
  node: AnimatorRefChild
  time: number
}

export interface AnimatorChildrenActivations {
  duration?: number
  times: AnimatorChildrenActivationsTimes[]
}

export interface AnimatorSettingsManagerStatus {
  nodes: AnimatorRefChild[]
  duration: AnimatorDuration
}

export type AnimatorSettingsManagerCustom = (status: AnimatorSettingsManagerStatus) => AnimatorChildrenActivations;

export type AnimatorSettingsManager = typeof PARALLEL | typeof SEQUENCE | typeof STAGGER | AnimatorSettingsManagerCustom | undefined;

export interface AnimatorClassSettings {
  duration?: AnimatorSettingsDuration
  animate?: boolean
  root?: boolean
  merge?: boolean
  useAnimateMount?: () => void
  useAnimateEntering?: () => void
  useAnimateEntered?: () => void
  useAnimateExiting?: () => void
  useAnimateExited?: () => void
  useAnimateUnmount?: () => void
}

export interface AnimatorInstanceSettings extends AnimatorClassSettings {
  activate?: boolean
  onTransition?: () => void
}
