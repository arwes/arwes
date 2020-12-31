import { Howl } from 'howler';

export const BLEEPS_BACKGROUND = 'background';
export const BLEEPS_TRANSITION = 'transition';
export const BLEEPS_INTERACTION = 'interaction';
export const BLEEPS_NOTIFICATION = 'notification';
export const BLEEPS_CATEGORIES = [
  BLEEPS_BACKGROUND,
  BLEEPS_TRANSITION,
  BLEEPS_INTERACTION,
  BLEEPS_NOTIFICATION
];

// Bleeps Audio

export interface BleepsAudioGroupSettings {
  volume?: number
  rate?: number
  preload?: boolean
  disabled?: boolean
}

export type BleepCategoryName = typeof BLEEPS_BACKGROUND | typeof BLEEPS_TRANSITION | typeof BLEEPS_INTERACTION | typeof BLEEPS_NOTIFICATION;

export type BleepsAudioCategoriesSettings = Partial<Record<BleepCategoryName, BleepsAudioGroupSettings>>;

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
  disabled?: boolean
}

export type BleepsPlayersSettings = Record<BleepPlayerName, BleepPlayerSettings>;

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

export type BleepsSettings = Record<BleepName, BleepSettings | undefined>;

// Bleeps Consumer Injection

export interface Bleep {
  _settings: BleepsAudioGroupSettings & BleepPlayerSettings
  _howl: Howl
  play: () => void
  pause: () => void
  seek: (time: number) => void
  stop: () => void
  getIsPlaying: () => boolean
  getDuration: () => number
  unload: () => void
}

export type Bleeps = Record<BleepName, Bleep>;
