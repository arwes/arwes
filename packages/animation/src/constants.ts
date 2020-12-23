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

export interface AnimatorDuration {
  enter: number
  exit: number
  stagger: number
  delay: number
  offset: number
}

export interface AnimatorSettingsDuration {
  enter?: number
  exit?: number
  stagger?: number
  delay?: number
  offset?: number
}

export type AnimatorSettingsManagerCustom = (status: AnimatorSettingsManagerStatus) => AnimatorChildrenActivations;

export type AnimatorSettingsManager = typeof PARALLEL | typeof SEQUENCE | typeof STAGGER | AnimatorSettingsManagerCustom;

export type AnimatorSettingsUseAnimate = (animator: AnimatorProvidedSettings, refs: any) => void;

export type AnimatorSettingsOnTransition = (flow: AnimatorFlow) => void;

export interface AnimatorGeneralProviderProvidedSettings {
  duration?: AnimatorSettingsDuration
}

/** `<AnimatorGeneralProvider />` component `animator` settings prop. */
export interface AnimatorGeneralProviderSettings {
  duration?: AnimatorSettingsDuration
}

export interface AnimatorRefChild {
  id: number
  getDuration: () => AnimatorDuration
  getIsMerge: () => boolean
  setActivate: (activate: boolean) => void
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

export interface AnimatorProvidedSettings {
  duration: AnimatorDuration
  animate: boolean
  root: boolean
  merge: boolean
  flow: AnimatorFlow
  setupAnimateRefs: (refs: any) => void
  updateDuration: (duration: AnimatorSettingsDuration | undefined) => void
  _id: number
  _subscribe: (id: number, node: AnimatorRefChild) => void
  _unsubscribe: (id: number) => void
}

export interface AnimatorClassSettings {
  duration?: AnimatorSettingsDuration
  animate?: boolean
  root?: boolean
  merge?: boolean
  manager?: AnimatorSettingsManager
  useAnimateMount?: AnimatorSettingsUseAnimate
  useAnimateEntering?: AnimatorSettingsUseAnimate
  useAnimateEntered?: AnimatorSettingsUseAnimate
  useAnimateExiting?: AnimatorSettingsUseAnimate
  useAnimateExited?: AnimatorSettingsUseAnimate
  useAnimateUnmount?: AnimatorSettingsUseAnimate
}

export interface AnimatorInstanceSettings extends AnimatorClassSettings {
  activate?: boolean
  onTransition?: AnimatorSettingsOnTransition
}

/** `<Animator />` component `animator` settings prop. */
export interface AnimatorSettings extends AnimatorInstanceSettings {}
