import { Howl } from 'howler';

// Bleeps Audio

export interface BleepsAudioGroupSettings {
  volume?: number
  mute?: boolean
  rate?: number
  preload?: boolean
}

export type BleepCategoryName = string;

export type BleepsAudioCategoriesSettings = Record<BleepCategoryName, BleepsAudioGroupSettings>;

export interface BleepsAudioSettings {
  common?: BleepsAudioGroupSettings
  categories?: BleepsAudioCategoriesSettings
}

// Bleeps Players

export type BleepPlayerName = string;

export interface BleepPlayerSettings {
  src: string[]
  format?: string[]
  loop?: boolean
  rate?: number
}

export type BleepsPlayersSettings = Record<BleepPlayerName, BleepPlayerSettings>;

export type BleepPlayer = Howl;

export type BleepsPlayers = Record<BleepPlayerName, BleepPlayer>;

// Bleeps Provider

export interface BleepsSetup {
  audioSettings: BleepsAudioSettings
  playersSettings: BleepsPlayersSettings
}

// Bleeps Consumer Configuration

export type BleepName = string;

export interface BleepSettings {
  player: BleepPlayerName
  category?: BleepCategoryName
  shared?: boolean
}

export type BleepsSettings = Record<BleepName, BleepSettings>;

// Bleeps Consumer Injection

export interface Bleep {
  play: () => void
  pause: () => void
  seek: (time: number) => void
  stop: () => void
  getIsPlaying: () => boolean
  getDuration: () => number
}

export type Bleeps = Record<BleepName, Bleep>;
