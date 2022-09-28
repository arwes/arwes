export interface AnimatorGeneralProviderSettings {
  /**
   * If disabled, it will inherit its parent animator interface, so the system
   * will continue without this animator node.
   */
  disabled?: boolean

  /**
   * If dismissed, it will turn off all animated animations downwards the system.
   */
  dismissed?: boolean

  duration?: Record<string, number>
}

export interface AnimatorGeneralInterface {
  getSettings: () => AnimatorGeneralProviderSettings
}
