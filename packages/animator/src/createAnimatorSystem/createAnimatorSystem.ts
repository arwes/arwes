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

    const nodeBase = {
      id: nodeId,
      control,
      parent,
      children: new Set<AnimatorNode>(),
      subscribers: new Set<AnimatorSubscriber>(),
      scheduler: createTOScheduler()
    };

    const manager = createAnimatorManager(nodeBase as AnimatorNode, control.getSettings().manager);
    const machine = createAnimatorMachine(nodeBase as AnimatorNode);

    Object.defineProperty(nodeBase, 'manager', {
      get () {
        return manager;
      }
    });

    Object.defineProperty(nodeBase, 'send', {
      get () {
        return machine.send;
      }
    });

    Object.defineProperty(nodeBase, 'state', {
      get () {
        return machine.getState();
      }
    });

    const node = Object.freeze(nodeBase as AnimatorNode);

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
