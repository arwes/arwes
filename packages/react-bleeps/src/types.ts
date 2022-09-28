import type {
  BleepsAudioSettings,
  BleepsPlayersSettings,
  BleepsSettings,
  BleepsGenerics
} from '@arwes/bleeps';

export interface BleepsSetup {
  settings: {
    audio: BleepsAudioSettings
    players: BleepsPlayersSettings
    bleeps: BleepsSettings
  }
  bleeps: BleepsGenerics
}
