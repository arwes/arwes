// The "createAnimatorSystem" API is supposed to be used with abstractions APIs
// such as packages "@arwes/react-animator" and "@arwes/react-animated".
// This is just a brief example.
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { animate } from 'motion';
import {
  type AnimatorControl,
  type AnimatorNode,
  type AnimatorDuration,
  type AnimatorSettingsPartial,
  ANIMATOR_DEFAULT_DURATION,
  ANIMATOR_DEFAULT_SETTINGS,
  createAnimatorSystem
} from '@arwes/animator';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <style>
    .item {
      margin: 10px;
      width: 40px;
      height: 20px;
      background-color: #777;
    }
    .margin-left {
      margin-left: 20px;
    }
  </style>

  <div>
    <div id="parent" class="item"></div>
    <div class="margin-left">
      <div id="child1" class="item"></div>
      <div id="child2" class="item"></div>
      <div id="child3" class="item"></div>
    </div>
  </div>
`;

const system = createAnimatorSystem();

const createNode = (
  parentNode: AnimatorNode | null,
  element: HTMLElement,
  getSettings?: () => AnimatorSettingsPartial
): AnimatorNode => {
  // Animator node control. It is used as an interface from UI components to
  // the animator node.
  const control: AnimatorControl = {
    // If a node is a parent, it will expect an "active" value to change from
    // transition between states. Otherwise, it will listen to its parent node.
    getSettings: () => {
      const providedSettings = getSettings?.();
      return {
        // Send the default animator settings.
        ...ANIMATOR_DEFAULT_SETTINGS,

        duration: {
          ...ANIMATOR_DEFAULT_DURATION,
          ...providedSettings?.duration
        } as AnimatorDuration
      };
    },
    getDynamicSettings: () => null,
    setDynamicSettings: () => null,
    getForeignRef: () => null,
    setForeignRef: () => null
  };

  // Create a new node in the system with the parent node reference.
  // If parent is not defined, it will be the root node.
  const node = system.register(parentNode, control);

  // Subscribe to node state changes.
  node.subscribe(() => {
    const { duration } = node;

    switch (node.state) {
      case 'entering': {
        animate(
          element,
          { x: [0, 50], backgroundColor: ['#0ff', '#ff0'] },
          { duration: duration.enter }
        );
        break;
      }
      case 'exiting': {
        animate(
          element,
          { x: [50, 0], backgroundColor: ['#ff0', '#0ff'] },
          { duration: duration.exit }
        );
        break;
      }
    }
  });

  // Setup initial node state based on "control.getSettings()" value.
  node.send('setup');

  return node;
};

// A variable to know when the parent node should be active or not.
let isActive = true;

const parentNode = createNode(
  null,
  rootElement.querySelector('#parent') as HTMLDivElement,
  () => ({ active: isActive, manager: 'stagger' })
);

createNode(parentNode, rootElement.querySelector('#child1') as HTMLDivElement);
createNode(parentNode, rootElement.querySelector('#child2') as HTMLDivElement);
createNode(parentNode, rootElement.querySelector('#child3') as HTMLDivElement);

setInterval(() => {
  isActive = !isActive;

  // When a node updates its settings, trigger an update event so it can
  // review the changes and act accordingly.
  parentNode.send('update');
}, 2000);
