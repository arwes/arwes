import { createTOScheduler } from '@arwes/tools';

import type {
  AnimatorControl,
  AnimatorSubscriber,
  AnimatorNode,
  AnimatorSystem
} from '../types';
import { createAnimatorMachine } from '../internal/createAnimatorMachine/index';
import { createAnimatorManager } from '../internal/createAnimatorManager/index';

const createAnimatorSystem = (): AnimatorSystem => {
  const systemId = `s${Math.random()}`.replace('.', '');

  let nodeIdCounter = 0;
  let root: AnimatorNode | undefined;

  const createNode = (parent: AnimatorNode | undefined | null, control: AnimatorControl): AnimatorNode => {
    const nodeId = `${systemId}-n${nodeIdCounter++}`;

    // The node object reference is passed around in multiple places with some
    // circular references, so this is an object base and later is modified
    // with specific readonly and writable properties.
    const node = { id: nodeId } as unknown as AnimatorNode;

    const settings = control.getSettings();
    const machine = createAnimatorMachine(node, settings.initialState);
    const manager = createAnimatorManager(node, settings.manager);

    const nodeProps: { [P in keyof AnimatorNode]: PropertyDescriptor } = {
      id: {
        value: nodeId,
        enumerable: true
      },
      control: {
        value: control,
        enumerable: true
      },
      parent: {
        value: parent,
        enumerable: true
      },
      children: {
        value: new Set<AnimatorNode>(),
        enumerable: true
      },
      subscribers: {
        value: new Set<AnimatorSubscriber>(),
        enumerable: true
      },
      scheduler: {
        value: createTOScheduler(),
        enumerable: true
      },
      duration: {
        get: (): { enter: number, exit: number } => {
          const { duration, combine } = node.control.getSettings();
          const enter = combine
            ? node.manager.getDurationEnter(Array.from(node.children))
            : duration.enter || 0;
          const exit = duration.exit || 0;
          return { enter, exit };
        },
        enumerable: true
      },
      state: {
        get: () => machine.getState(),
        enumerable: true
      },
      subscribe: {
        value: (subscriber: AnimatorSubscriber): (() => void) => {
          node.subscribers.add(subscriber);
          subscriber(node);
          return () => node.subscribers.delete(subscriber);
        },
        enumerable: true
      },
      unsubscribe: {
        value: (subscriber: AnimatorSubscriber): void => {
          node.subscribers.delete(subscriber);
        },
        enumerable: true
      },
      send: {
        value: machine.send,
        enumerable: true
      },
      manager: {
        value: manager,
        enumerable: true,
        writable: true
      }
    };

    Object.defineProperties(node, nodeProps);

    if (parent) {
      parent.children.add(node);
    }

    return node;
  };

  const removeNode = (node: AnimatorNode): void => {
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

  const register = (parentNode: AnimatorNode | undefined | null, control: AnimatorControl): AnimatorNode => {
    if (parentNode === undefined || parentNode === null) {
      if (root) {
        throw new Error('The root node must be unregistered before registering another root node.');
      }

      root = createNode(undefined, control);

      return root;
    }

    if (!root) {
      throw new Error('A root node needs to be registered first in the system before registering children nodes.');
    }

    return createNode(parentNode, control);
  };

  const unregister = (node: AnimatorNode): void => {
    if (!root) {
      return;
    }

    removeNode(node);

    if (root.id === node.id) {
      root = undefined;
    }
  };

  // System object reference so it can have dynamic object properties setup later.
  const system = {} as unknown as AnimatorSystem;

  const systemProps: { [P in keyof AnimatorSystem]: PropertyDescriptor } = {
    id: {
      value: systemId,
      enumerable: true
    },
    root: {
      get: () => root,
      enumerable: true
    },
    register: {
      value: register,
      enumerable: true
    },
    unregister: {
      value: unregister,
      enumerable: true
    }
  };

  Object.defineProperties(system, systemProps);

  return system;
};

export { createAnimatorSystem };
