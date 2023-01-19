import { TOOLS_IS_BROWSER } from '@arwes/tools';

import type { AnimatorNode, AnimatorState, AnimatorAction } from '../../types';
import { ANIMATOR_STATES as STATES, ANIMATOR_ACTIONS as ACTIONS } from '../../constants';
import { createAnimatorManager } from '../createAnimatorManager/index';

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

const createAnimatorMachine = (node: AnimatorNode): AnimatorMachine => {
  let state: AnimatorState = STATES.exited;
  let hasSetup = false;

  const statesMap: StatesMap = {
    [STATES.exited]: {
      onActions: {
        [ACTIONS.setup]: () => {
          if (hasSetup) {
            return;
          }
          hasSetup = true;

          const settings = node.control.getSettings();

          if (node.parent) {
            const parentSettings = node.parent.control.getSettings();

            switch (node.parent.state) {
              case STATES.entering: {
                if (parentSettings.combine || settings.merge) {
                  node.parent._context.manager.enterChildren([node]);
                }
                break;
              }
              // If the parent has already entered, enter the incoming children whether
              // they have "merge" setting or the parent is in "combine" setting.
              case STATES.entered: {
                node.parent._context.manager.enterChildren([node]);
                break;
              }
            }
          }
          else {
            const isActive = (settings.active as boolean | undefined) === true ||
              settings.active === undefined;

            if (isActive) {
              return STATES.entering;
            }
          }
        },

        [ACTIONS.enter]: STATES.entering
      }
    },

    [STATES.entering]: {
      onEntry: {
        execute: () => {
          const { combine } = node.control.getSettings();
          const children = combine
            ? Array.from(node.children)
            : Array.from(node.children).filter(child => child.control.getSettings().merge);

          node._context.manager.enterChildren(children);
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
        [ACTIONS.exit]: STATES.exiting
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

          node._context.manager.enterChildren(children);
        }
      },

      onActions: {
        [ACTIONS.exit]: STATES.exiting
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

          if (settings.manager !== node._context.manager.name) {
            node._context.manager = createAnimatorManager(node, settings.manager);
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
    if (!TOOLS_IS_BROWSER) {
      return;
    }

    processAction(statesMap[state]?.onActions?.[action]);
    processAction(statesMap['*']?.onActions?.[action]);
  };

  const machine: AnimatorMachine = Object.freeze({ getState, send });

  return machine;
};

export { createAnimatorMachine };
