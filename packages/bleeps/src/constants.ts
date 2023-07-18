import { IS_BROWSER } from '@arwes/tools';
import type { BleepCategory } from './types';

export const IS_BLEEPS_AVAILABLE = IS_BROWSER && !!window.AudioContext;

export const BLEEPS_CATEGORIES: { [P in BleepCategory]: P } = {
  background: 'background',
  transition: 'transition',
  interaction: 'interaction',
  notification: 'notification'
};
