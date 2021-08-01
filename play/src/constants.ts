export interface ArwesSandboxConfig {
  name: string
  code: string
}

export interface ArwesComponentConfig {
  name: string
  sandboxes: ArwesSandboxConfig[]
}

export interface ArwesPackageConfig {
  name: string
  components: ArwesComponentConfig[]
}

export interface RouterState {
  route: string[]

  isControlsEnabled: boolean
  isControlsActive: boolean
  toggleControls: () => void

  isEditorEnabled: boolean
  isEditorActive: boolean
  toggleEditor: () => void

  isPreviewEnabled: boolean
  isPreviewActive: boolean
  togglePreview: () => void

  sandboxConfig?: ArwesSandboxConfig
}

export const ROUTER_STATE_URL_OPTION_CONTROLS = 'controls';
export const ROUTER_STATE_URL_OPTION_EDITOR = 'editor';
export const ROUTER_STATE_URL_OPTION_PREVIEW = 'preview';
