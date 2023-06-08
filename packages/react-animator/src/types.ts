import type { AnimatorDuration } from '@arwes/animator';

export interface AnimatorGeneralProviderSettings {
  /**
   * If disabled, it will turn off all animated animations downwards the system.
   */
  disabled?: boolean

  /**
   * If dismissed, it will inherit its parent animator interface, so the system
   * will continue without this specific animator node.
   */
  dismissed?: boolean

  duration?: Partial<AnimatorDuration>
}

export interface AnimatorGeneralInterface {
  getSettings: () => AnimatorGeneralProviderSettings
}
