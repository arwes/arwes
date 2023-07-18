import { IS_BROWSER } from '@arwes/tools';
import type { BleepCategory } from './types';

export const BLEEPS_CATEGORIES: { [P in BleepCategory]: P } = {
  background: 'background',
  transition: 'transition',
  interaction: 'interaction',
  notification: 'notification'
};
