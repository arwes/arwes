import { TOOLS_IS_BROWSER, createTOScheduler } from '@arwes/tools';

import type {
  AnimatorSystemNodeId,
  AnimatorSystemNodeSubscriber,
  AnimatorSystemNode,
  AnimatorSystem,
  AnimatorControl
} from '../types';

// TODO: Animator with "combine" should have its duration as the total duration
// of its children's durations.
// TODO: The scheduling right now is as follows:
// 1. Animator setup node
// 2. System create node
// 3. System schedules node setup
// 3. Animator schedules control change
// 3. Component subscribes to node
// 4. System node setup
// 5. System node transition
// 6. Machine run control change
// 6. System node transitions if applicable
// The sequence of events is not playing with the React scheduling system.
// And the initial schedules (setup and change) complicates the system.
// There should be a simpler way to sync with the React system to setup and
// properly detect for control changes for transitions.

const createAnimatorSystem = (): AnimatorSystem => {
  let idCounter = 0;
  let root: AnimatorSystemNode | undefined;

  const createNode = (parent: AnimatorSystemNode | undefined, control: AnimatorControl): AnimatorSystemNode => {
    const { machine } = control.getSettings();

    if (!machine) {
      throw new Error('A machine is required to create an animator node.');
    }

    const id: AnimatorSystemNodeId = idCounter++;

    let node: AnimatorSystemNode | undefined; // eslint-disable-line prefer-const
    let state: string = '';

    const transition = (newState: string): void => {
      if (state === newState) {
        return;
      }

      state = newState;

      const nodeScoped = node as AnimatorSystemNode;
      const { onEntry } = machine.states[state] || {};
      const { onTransition } = control.getSettings();

      if (onEntry?.execute) {
        onEntry.execute(nodeScoped);
      }

      if (onEntry?.schedule) {
        const task = onEntry.schedule(nodeScoped);

        if (!Number.isFinite(task.duration) || task.duration < 0 || !task.action.length) {
          throw new Error('Machine state schedule must return a valid duration and action name.');
        }

        nodeScoped.scheduler.start(task.duration, () => send(task.action));
      }

      machine.onTransition?.(nodeScoped);

      onTransition?.(nodeScoped);

      for (const subscriber of nodeScoped.subscribers) {
        subscriber(nodeScoped);
      }
    };

    const send = (action: string): void => {
      const newState = machine.states[state]?.onActions?.[action];

      if (newState) {
        transition(newState);
      }
    };

    const onSettingsChange = (): void => {
      const nodeScoped = node as AnimatorSystemNode;

      // Schedule after React useEffects have taken effect so the potential
      // subscribers have been subscribed and the node setup has been done.
      nodeScoped.scheduler.start('change', 0.001, () => {
        machine.onSettingsChange?.(nodeScoped);
      });
    };

    node = Object.freeze({
      id,
      control,
      parent,
      children: new Set<AnimatorSystemNode>(),
      subscribers: new Set<AnimatorSystemNodeSubscriber>(),
      scheduler: createTOScheduler(),
      context: {},
      getState: () => state,
      send,
      onSettingsChange
    });

    if (parent) {
      parent.children.add(node);
    }

    if (TOOLS_IS_BROWSER) {
      // Schedule after React useEffects have taken effect so the potential
      // subscribers have been subscribed and before any node change.
      node.scheduler.start('setup', 0.001, () => {
        const nodeScoped = node as AnimatorSystemNode;

        machine.onCreate?.(nodeScoped);
        transition(machine.initialState);
        machine.onInitialTransition?.(nodeScoped);
      });
    }

    return node;
  };

  const removeNode = (node: AnimatorSystemNode): void => {
    node.scheduler.stopAll();

    for (const child of node.children) {
      removeNode(child);
    }

    if (node.parent) {
      node.parent.children.delete(node);
    }

    node.children.clear();
    node.subscribers.clear();
  };

  const unregister = (node: AnimatorSystemNode): void => {
    if (!root) {
      return;
    }

    removeNode(node);

    if (root.id === node.id) {
      root = undefined;
    }
  };

  const setup = (control: AnimatorControl): AnimatorSystemNode => {
    if (root) {
      removeNode(root);
    }

    root = createNode(undefined, control);

    return root;
  };

  const register = (parent: AnimatorSystemNode, control: AnimatorControl): AnimatorSystemNode => {
    if (!root) {
      throw new Error('A root node needs to be setup before registering nodes.');
    }

    return createNode(parent, control);
  };

  return Object.freeze({ setup, register, unregister });
};

export { createAnimatorSystem };
