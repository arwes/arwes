import type { AnimatorSystemNode, AnimatorSettingsMachine } from '../types';

// States
const ENTERED = 'entered';
const ENTERING = 'entering';
const EXITING = 'exiting';
const EXITED = 'exited';

// Actions
const ENTER_START = 'enterStart';
const ENTER_END = 'enterEnd';
const EXIT_START = 'exitStart';
const EXIT_END = 'exitEnd';

// Managers
const PARALLEL = 'parallel';
const SEQUENCE = 'sequence';
const STAGGER = 'stagger';

interface AnimatorManager {
  name: string
  transitionChildren: (children: AnimatorSystemNode[]) => void
}

type AnimatorManagerCreator = (parent: AnimatorSystemNode) => AnimatorManager;

const createAnimatorManagerParallel: AnimatorManagerCreator = () => {
  const transitionChildren = (children: AnimatorSystemNode[]): void => {
    children.forEach(child => child.send(ENTER_START));
  };
  return Object.freeze({ name: PARALLEL, transitionChildren });
};

const createAnimatorManagerStagger: AnimatorManagerCreator = parent => {
  let reservedUntilTime: number | undefined;

  const transitionChildren = (children: AnimatorSystemNode[]): void => {
    const parentSettings = parent.control.getSettings();
    const stagger = (parentSettings.duration?.stagger || 0) * 1000; // seconds to ms

    const now = Date.now();

    reservedUntilTime = reservedUntilTime !== undefined
      ? Math.max(reservedUntilTime, now)
      : now;

    children.forEach(child => {
      const childSettings = child.control.getSettings();
      const offset = (childSettings.duration?.offset || 0) * 1000; // seconds to ms

      reservedUntilTime = (reservedUntilTime as number) + offset;

      const delay = (reservedUntilTime - now) / 1000; // ms to seconds

      reservedUntilTime = reservedUntilTime + stagger;

      child.scheduler.start(delay, () => child.send(ENTER_START));
    });
  };

  return Object.freeze({ name: STAGGER, transitionChildren });
};

// TODO: Add support.
const createAnimatorManagerSequence: AnimatorManagerCreator = () => {
  const transitionChildren = (): void => {};
  return Object.freeze({ name: SEQUENCE, transitionChildren });
};

const createAnimatorManager = (parent: AnimatorSystemNode, manager?: string): AnimatorManager => {
  switch (manager) {
    case STAGGER: return createAnimatorManagerStagger(parent);
    case SEQUENCE: return createAnimatorManagerSequence(parent);
    default: return createAnimatorManagerParallel(parent);
  }
};

const animatorDefaultMachine: AnimatorSettingsMachine = Object.freeze({
  initialState: EXITED,
  states: {
    [EXITED]: {
      onActions: {
        [ENTER_START]: ENTERING
      }
    },
    [ENTERING]: {
      onEntry: {
        schedule: node => {
          const { duration: { delay = 0, enter = 0 } = {} } = node.control.getSettings();
          return {
            duration: delay + enter,
            action: ENTER_END
          };
        }
      },
      onActions: {
        [ENTER_END]: ENTERED,
        [EXIT_START]: EXITING
      }
    },
    [ENTERED]: {
      onActions: {
        [EXIT_START]: EXITING
      }
    },
    [EXITING]: {
      onEntry: {
        schedule: node => ({
          duration: node.control.getSettings().duration?.exit || 0,
          action: EXIT_END
        })
      },
      onActions: {
        [EXIT_END]: EXITED,
        [ENTER_START]: ENTERING
      }
    }
  },
  onCreate: node => {
    const settings = node.control.getSettings();

    node.context.manager = createAnimatorManager(node, settings.manager);
  },
  onTransition: node => {
    const state = node.getState();
    const { combine } = node.control.getSettings();
    const manager = node.context.manager as AnimatorManager;

    switch (state) {
      case ENTERING: {
        const children = combine
          ? Array.from(node.children)
          : Array.from(node.children).filter(child => child.control.getSettings().merge);
        manager.transitionChildren(children);
        break;
      }
      case ENTERED: {
        if (combine) {
          break;
        }
        const children = Array.from(node.children).filter(child => !child.control.getSettings().merge);
        manager.transitionChildren(children);
        break;
      }
      case EXITING: {
        Array.from(node.children).forEach(child => {
          const childState = child.getState();

          if (childState === ENTERING || childState === ENTERED) {
            child.send(EXIT_START);
          }
          else if (childState === EXITED) {
            child.scheduler.stop();
          }
          // If the child is EXITING, it will go to EXITED soon.
        });
        break;
      }
    }
  },
  onInitialTransition: node => {
    if (node.parent) {
      const settings = node.control.getSettings();

      const parentState = node.parent.getState();
      const parentSettings = node.parent.control.getSettings();
      const parentManager = node.parent.context.manager as AnimatorManager;

      switch (parentState) {
        case ENTERING: {
          if (parentSettings.combine || settings.merge) {
            parentManager.transitionChildren([node]);
          }
          break;
        }
        case ENTERED: {
          // If the parent has already ENTERED, enter the incoming children whether
          // they have "merge" setting or the parent is in "combine" setting.
          parentManager.transitionChildren([node]);
          break;
        }
      }
    }
  },
  onSettingsChange: node => {
    const state = node.getState();
    const settings = node.control.getSettings();
    const manager = node.context.manager as AnimatorManager;

    if (!node.parent) {
      const isActive = settings.active === true || settings.active === undefined;

      if ((state === EXITED || state === EXITING) && isActive) {
        node.send(ENTER_START);
      }
      else if ((state === ENTERED || state === ENTERING) && !isActive) {
        node.send(EXIT_START);
      }
    }

    if (manager.name !== settings.manager) {
      node.context.manager = createAnimatorManager(node, settings.manager);
    }
  }
});

const animatorDefaultDuration = Object.freeze({
  enter: 0.4,
  exit: 0.4,
  delay: 0,
  offset: 0,
  stagger: 0.04
});

const animatorDefaultManager = PARALLEL;

const animatorDefaults = {
  machine: animatorDefaultMachine,
  duration: animatorDefaultDuration,
  manager: animatorDefaultManager
};

export { animatorDefaults };
