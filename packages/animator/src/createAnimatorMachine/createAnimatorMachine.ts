import { TOOLS_IS_BROWSER } from '@arwes/tools';

import type { AnimatorNode, AnimatorState, AnimatorAction } from '../types';
import { ANIMATOR_STATES, ANIMATOR_ACTIONS } from '../constants';

const { exited, entering, entered, exiting } = ANIMATOR_STATES;
const { setup, enter, enterEnd, exit, exitEnd, update } = ANIMATOR_ACTIONS;

interface AnimatorMachine {
  getState: () => AnimatorState
  send: (action: AnimatorAction) => void
  start: () => void
}

type ActionTransition = (() => AnimatorState) | (() => void);

type StatesMap = {
  [P in AnimatorState | '*']?: {
    onEntry?: {
      execute?: () => void
      schedule?: () => { duration: number, action: AnimatorAction }
    }
    onActions?: {
      [P in AnimatorAction]?: AnimatorState | ActionTransition
    }
  }
};

const createAnimatorMachine = (node: AnimatorNode): AnimatorMachine => {
  let state: AnimatorState = exited;

  const statesMap: StatesMap = {
    [exited]: {
      onActions: {
        [setup]: () => {
          if (node.parent) {
            const settings = node.control.getSettings();
            const parentSettings = node.parent.control.getSettings();
            const parentManager = node.parent.manager;

            switch (node.parent.state) {
              case entering: {
                if (parentSettings.combine || settings.merge) {
                  parentManager.enterChildren([node]);
                }
                break;
              }
              // If the parent has already entered, enter the incoming children whether
              // they have "merge" setting or the parent is in "combine" setting.
              case entered: {
                parentManager.enterChildren([node]);
                break;
              }
            }
          }
        },

        [enter]: entering
      }
    },

    [entering]: {
      onEntry: {
        execute: () => {
          const { combine } = node.control.getSettings();
          const children = combine
            ? Array.from(node.children)
            : Array.from(node.children).filter(child => child.control.getSettings().merge);

          node.manager.enterChildren(children);

          if (node.parent) {
            //
          }
        },

        schedule: () => {
          const { duration } = node.control.getSettings();
          return {
            duration: (duration.delay + duration.enter) || 0,
            action: enterEnd
          };
        }
      },

      onActions: {
        [enterEnd]: entered,
        [exit]: exiting
      }
    },

    [entered]: {
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
        [exit]: exiting
      }
    },

    [exiting]: {
      onEntry: {
        execute: () => {
          Array.from(node.children).forEach(child => {
            if (child.state === entering || child.state === entered) {
              child.send(exit);
            }
            else if (child.state === exited) {
              child.scheduler.stopAll();
            }
            // If the child is EXITING, it will go to EXITED soon.
          });
        },

        schedule: () => ({
          duration: node.control.getSettings().duration.exit || 0,
          action: exitEnd
        })
      },

      onActions: {
        [exitEnd]: exited,
        [enter]: entering
      }
    },

    '*': {
      onActions: {
        [update]: () => {
          if (!node.parent) {
            const settings = node.control.getSettings();
            const isActive = (settings.active as boolean | undefined) === true ||
              settings.active === undefined;

            if ((state === exited || state === exiting) && isActive) {
              return entering;
            }
            else if ((state === entered || state === entering) && !isActive) {
              return exiting;
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

  const processAction = (exec: AnimatorState | ActionTransition | undefined): void => {
    if (exec === undefined) {
      return;
    }

    if (typeof exec === 'function') {
      const newState = exec();
      if (newState) {
        transition(newState);
      }
    }
    else {
      transition(exec);
    }
  };

  const getState = (): AnimatorState => state;

  const send = (action: AnimatorAction): void => {
    processAction(statesMap[state]?.onActions?.[action]);
    processAction(statesMap['*']?.onActions?.[action]);
  };

  const start = (): void => {
    // In non-browser environments, there are not transitions.
    if (TOOLS_IS_BROWSER) {
      node.scheduler.start(0.001, () => {
        node.send(setup);

        const isRoot = node.parent;
        const { active } = node.control.getSettings();
        const isActive = (active as boolean | undefined) === true || active === undefined;

        if (!isRoot && isActive) {
          // Schedule the transition to the next event loop after the UI components
          // implementing the animator have setup. For example, wait until the UI
          // elements have been rendered.
          node.scheduler.start(0.001, () => {
            // Trigger transition to initial value.
            send(enter);
          });
        }
      });
    }
  };

  const machine: AnimatorMachine = Object.freeze({ getState, send, start });

  return machine;
};

export { createAnimatorMachine };
