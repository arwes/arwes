import type {
  AnimatorState,
  AnimatorAction,
  AnimatorManagerName,
  AnimatorDuration,
  AnimatorSettings
} from './types';

// States
export const ANIMATOR_STATES: { [P in AnimatorState]: P } = Object.freeze({
  entered: 'entered',
  entering: 'entering',
  exiting: 'exiting',
  exited: 'exited'
});

// Actions
export const ANIMATOR_ACTIONS: { [P in AnimatorAction]: P } = Object.freeze({
  setup: 'setup',
  enter: 'enter',
  enterEnd: 'enterEnd',
  exit: 'exit',
  exitEnd: 'exitEnd',
  update: 'update',
  refresh: 'refresh'
});

// Managers
export const ANIMATOR_MANAGER_NAMES: { [P in AnimatorManagerName]: P } = Object.freeze({
  parallel: 'parallel',
  stagger: 'stagger',
  staggerReverse: 'staggerReverse',
  sequence: 'sequence',
  sequenceReverse: 'sequenceReverse',
  switch: 'switch'
});

export const ANIMATOR_DEFAULT_DURATION: AnimatorDuration = Object.freeze({
  enter: 0.4,
  exit: 0.4,
  delay: 0,
  offset: 0,
  stagger: 0.04
});

export const ANIMATOR_DEFAULT_SETTINGS: AnimatorSettings = Object.freeze({
  active: true,
  duration: ANIMATOR_DEFAULT_DURATION,
  manager: ANIMATOR_MANAGER_NAMES.parallel,
  merge: false,
  combine: false,
  initialState: 'exited'
});
