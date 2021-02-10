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

  /**
   * If the component has ENTERED in the flow at least once.
   */
  hasEntered?: boolean

  /**
   * If the component has EXITED in the flow at least once.
   */
  hasExited?: boolean
}

export interface AnimatorDuration {
  enter: number
  exit: number

  /**
   * In STAGGER manager, the duration to stagger the children nodes on
   * transition in.
   */
  stagger: number

  /**
   * The time to delay the flow transition from EXITED to ENTERING.
   */
  delay: number

  /**
   * In non-PARALLEL manager, the time to add as a delay to the current
   * component onwards in the list of children nodes.
   */
  offset: number
}

/**
 * The reference from one `<Animator />` component to a child counterpart.
 * It is used for communication between components.
 */
export interface AnimatorChildRef {
  id: number
  getDuration: () => AnimatorDuration
  getIsMerge: () => boolean
  setActivate: (activate: boolean) => void
}

/**
 * The available duration settings to configure in `<Animator />`.
 */
export type AnimatorSettingsDuration = Partial<AnimatorDuration>;

/**
 * In a custom function manager, it represents the available data to calculate
 * how the children nodes should transition in.
 */
export interface AnimatorSettingsManagerStatus {
  nodes: AnimatorChildRef[]
  duration: AnimatorDuration
}

/**
 * In a custom function manager, it is a `<Animator />` child node time to
 * transition in.
 */
export interface AnimatorChildActivationTime {
  node: AnimatorChildRef
  time: number
}

/**
 * In a custom function manager, it is the resulting definition of an `<Animator />`
 * each child activation times. An activation time is the time for the node
 * to transition in.
 */
export interface AnimatorChildActivations {
  duration?: number
  times: AnimatorChildActivationTime[]
}

/**
 * A custom function to manage how the `<Animator />` children nodes should
 * transition in the flow. It receives the manager status as a parameter only
 * when its flow value is in ENTERING or ENTERED according to its configuration.
 */
export type AnimatorSettingsManagerCustom = (status: AnimatorSettingsManagerStatus) => AnimatorChildActivations;

/**
 * The available `<Animator />` children flow transition managers.
 */
export type AnimatorSettingsManager = typeof PARALLEL | typeof SEQUENCE | typeof STAGGER | AnimatorSettingsManagerCustom;

/**
 * The implemented animator manager.
 */
export type AnimatorManager = AnimatorSettingsManager;

/**
 * The function type definition for the animator "animate hooks".
 * All the animate hooks would receive and return the same values.
 */
export type AnimatorSettingsUseAnimate = (animator: AnimatorRef, ...refs: any[]) => void;

/**
 * On `<Animator />` flow transition. It is called every time the animator transition
 * from one state to another. It is called also at mount time.
 */
export type AnimatorSettingsOnTransition = (flow: AnimatorFlow) => void;

/**
 * The `<Animator />` API reference which is provided to the component
 * and the reference returned by `useAnimator()` if available.
 */
export interface AnimatorRef {
  duration: AnimatorDuration
  animate: boolean
  root: boolean
  merge: boolean
  combine: boolean
  manager: AnimatorManager
  flow: AnimatorFlow

  /**
   * Send any data references to the "animate hooks" to handle HTML animations
   * when they are called. Usually, React HTMLElement references are used.
   */
  setupAnimateRefs: (...refs: any[]) => void

  /**
   * Update dynamically the duration, usually in component mount lifecycle.
   * This duration will take priority over the configured duration.
   * It can received `undefined` to remove it.
   */
  updateDuration: (duration: AnimatorSettingsDuration | undefined) => void

  _id: number
  _subscribe: (id: number, node: AnimatorChildRef) => void
  _unsubscribe: (id: number) => void
}

/**
 * Animator settings available in `withAnimator(animatorClassSettings)(Component)`
 * and `extendAnimator(animatorClassSettings)(Component)`.
 */
export interface AnimatorClassSettings {
  duration?: AnimatorSettingsDuration
  animate?: boolean
  root?: boolean
  merge?: boolean
  combine?: boolean
  manager?: AnimatorSettingsManager
  useAnimateMount?: AnimatorSettingsUseAnimate
  useAnimateEntering?: AnimatorSettingsUseAnimate
  useAnimateEntered?: AnimatorSettingsUseAnimate
  useAnimateExiting?: AnimatorSettingsUseAnimate
  useAnimateExited?: AnimatorSettingsUseAnimate
  useAnimateUnmount?: AnimatorSettingsUseAnimate
}

/**
 * Animator settings available in `<Animator animator={animatorInstanceSettings}>{...}<Animator/>`.
 * It should allow all available animator settings.
 */
export interface AnimatorInstanceSettings extends AnimatorClassSettings {
  activate?: boolean
  onTransition?: AnimatorSettingsOnTransition
}

/**
 * `Animator` component `animator` prop settings.
 * It should allow all available animator settings.
 */
export interface AnimatorSettings extends AnimatorInstanceSettings {}

/**
 * `<AnimatorGeneralProvider />` component `animator` prop settings.
 * It represents all the settings which can be shared and provided to all
 * descendant children nodes.
 */
export interface AnimatorGeneralProviderSettings {
  duration?: AnimatorSettingsDuration
}

/**
 * `<AnimatorGeneralProvider />` provided settings reference.
 * It is also the value returned by `useAnimatorGeneral()` if found.
 */
export interface AnimatorGeneralProviderRef {
  duration?: AnimatorSettingsDuration
}
