import { createTOScheduler } from '@arwes/tools';

import type {
  AnimatorControl,
  AnimatorSubscriber,
  AnimatorNode,
  AnimatorSystem
} from '../types';
import { createAnimatorManager } from '../internal/createAnimatorManager/index';
import { createAnimatorMachine } from '../internal/createAnimatorMachine/index';

const createAnimatorSystem = (): AnimatorSystem => {
  const systemId = `system-${Date.now()}-${Math.random()}`;

  let nodeIdCounter = 0;
  let root: AnimatorNode | undefined;

  const createNode = (parent: AnimatorNode | undefined, control: AnimatorControl): AnimatorNode => {
    const nodeId = `node-${nodeIdCounter++}`;

    // The node object reference is passed around in multiple places with some
    // circular references, so this is an object base and later is modified
    // with specific readonly and writable properties.
    const node = {} as unknown as AnimatorNode;

    const machine = createAnimatorMachine(node);
    const manager = createAnimatorManager(control.getSettings().manager);

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
            ? node.manager.getDurationEnter(node, Array.from(node.children))
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

  const register = (parentNode: AnimatorNode | undefined, control: AnimatorControl): AnimatorNode => {
    if (parentNode === undefined) {
      if (root) {
        throw new Error('The root node must be unregistered first before registering another root node.');
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

  return Object.freeze({ id: systemId, register, unregister });
};

export { createAnimatorSystem };
