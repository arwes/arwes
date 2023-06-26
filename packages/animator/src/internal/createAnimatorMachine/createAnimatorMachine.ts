import { IS_BROWSER } from '@arwes/tools';

import type { AnimatorNode, AnimatorState, AnimatorAction } from '../../types';
import { ANIMATOR_STATES as STATES, ANIMATOR_ACTIONS as ACTIONS } from '../../constants';
import { createAnimatorManager } from '../../internal/createAnimatorManager/index';

type ActionProcedure = (() => AnimatorState) | (() => void);

type StatesMap = {
  [P in AnimatorState | '*']?: {
    onEntry?: {
      execute?: () => void
      schedule?: () => { duration: number, action: AnimatorAction }
    }
    onActions?: {
      [P in AnimatorAction]?: AnimatorState | ActionProcedure
    }
  }
};

interface AnimatorMachine {
  getState: () => AnimatorState
  send: (action: AnimatorAction) => void
}

const createAnimatorMachine = (node: AnimatorNode, initialState: AnimatorState): AnimatorMachine => {
  let state: AnimatorState = initialState;

  const statesMap: StatesMap = {
    [STATES.exited]: {
      onActions: {
        [ACTIONS.enter]: STATES.entering,

        [ACTIONS.setup]: () => {
          const settings = node.control.getSettings();

          if (node.parent) {
            const parentSettings = node.parent.control.getSettings();

            switch (node.parent.state) {
              case STATES.entering: {
                if (parentSettings.combine || settings.merge) {
                  node.parent.manager.enterChildren([node]);
                }
                break;
              }
              // If the parent has already entered, enter the incoming children whether
              // they have "merge" setting or the parent is in "combine" setting.
              case STATES.entered: {
                node.parent.manager.enterChildren([node]);
                break;
              }
            }
          }
          else {
            const isActive = settings.active === undefined || settings.active;

            if (isActive) {
              return STATES.entering;
            }
          }
        }
      }
    },

    [STATES.entering]: {
      onEntry: {
        execute: () => {
          const { combine } = node.control.getSettings();
          const children = combine
            ? Array.from(node.children)
            : Array.from(node.children).filter(child => child.control.getSettings().merge);

          node.manager.enterChildren(children);
        },

        schedule: () => {
          const { duration } = node.control.getSettings();
          return {
            duration: (duration.delay + duration.enter) || 0,
            action: ACTIONS.enterEnd
          };
        }
      },

      onActions: {
        [ACTIONS.enterEnd]: STATES.entered,
        [ACTIONS.exit]: STATES.exiting,

        [ACTIONS.refresh]: () => {
          const settings = node.control.getSettings();
          const childrenExited = Array
            .from(node.children)
            .filter(child => child.state === STATES.exited);

          if (settings.combine) {
            node.manager.enterChildren(childrenExited);
          }
          else {
            const childrenMerged = childrenExited
              .filter(child => child.control.getSettings().merge);
            node.manager.enterChildren(childrenMerged);
          }
        }
      }
    },

    [STATES.entered]: {
      onEntry: {
        execute: () => {
          const { combine } = node.control.getSettings();

          if (combine) {
            return;
          }

          const children = Array
            .from(node.children)
            .filter(child => !child.control.getSettings().merge);

          node.manager.enterChildren(children);
        }
      },

      onActions: {
        [ACTIONS.exit]: STATES.exiting,

        [ACTIONS.refresh]: () => {
          const childrenExited = Array
            .from(node.children)
            .filter(child => child.state === STATES.exited);

          node.manager.enterChildren(childrenExited);
        }
      }
    },

    [STATES.exiting]: {
      onEntry: {
        execute: () => {
          Array.from(node.children).forEach(child => {
            if (child.state === STATES.entering || child.state === STATES.entered) {
              child.send(ACTIONS.exit);
            }
            else if (child.state === STATES.exited) {
              child.scheduler.stopAll();
            }
            // If the child is EXITING, it will go to EXITED soon.
          });
        },

        schedule: () => ({
          duration: node.control.getSettings().duration.exit || 0,
          action: ACTIONS.exitEnd
        })
      },

      onActions: {
        [ACTIONS.exitEnd]: STATES.exited,
        [ACTIONS.enter]: STATES.entering
      }
    },

    '*': {
      onActions: {
        [ACTIONS.update]: () => {
          const settings = node.control.getSettings();

          if (settings.manager !== node.manager.name) {
            node.manager.destroy?.();
            node.manager = createAnimatorManager(node, settings.manager);
          }

          if (!node.parent) {
            const isActive = (settings.active as boolean | undefined) === true ||
              settings.active === undefined;

            if ((state === STATES.exited || state === STATES.exiting) && isActive) {
              return STATES.entering;
            }
            else if ((state === STATES.entered || state === STATES.entering) && !isActive) {
              return STATES.exiting;
            }
          }
        }
      }
    }
  };

  const transition = (newState: AnimatorState): void => {
    if (!newState || state === newState) {
      return;
    }

    state = newState;

    const { onEntry } = statesMap[state] || {};
    const { onTransition } = node.control.getSettings();

    node.scheduler.stopAll();

    if (onEntry?.execute) {
      onEntry.execute();
    }

    if (onEntry?.schedule) {
      const task = onEntry.schedule();
      node.scheduler.start(task.duration, () => send(task.action));
    }

    onTransition?.(node);

    for (const subscriber of node.subscribers) {
      subscriber(node);
    }
  };

  const processAction = (procedure: AnimatorState | ActionProcedure | undefined): void => {
    if (procedure === undefined) {
      return;
    }

    if (typeof procedure === 'string') {
      transition(procedure);
    }
    else {
      const newState = procedure();
      if (newState) {
        transition(newState);
      }
    }
  };

  const getState = (): AnimatorState => state;

  const send = (action: AnimatorAction): void => {
    // In non-browser environments, there are no transitions.
    if (!IS_BROWSER) {
      return;
    }

    processAction(statesMap[state]?.onActions?.[action]);
    processAction(statesMap['*']?.onActions?.[action]);
  };

  const machine: AnimatorMachine = Object.freeze({ getState, send });

  return machine;
};

export { createAnimatorMachine };
