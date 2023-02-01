import { AnimatorNode, ANIMATOR_STATES as STATES } from '@arwes/animator';
import { easing } from '@arwes/animated';

import { transitionTextSequence } from '../transitionTextSequence/index';
import { transitionTextDecipher } from '../transitionTextDecipher/index';

interface CreateTextTransitionerProps {
  node: AnimatorNode
  rootElement: HTMLElement
  contentElement: HTMLElement
  initialText: string
  manager?: 'sequence' | 'decipher'
  easing?: keyof typeof easing
}

interface CreateTextTransitioner {
  update: (text: string) => void
  cancel: () => void
}

const createTextTransitioner = (props: CreateTextTransitionerProps): CreateTextTransitioner => {
  const {
    node,
    rootElement,
    contentElement,
    initialText,
    manager = 'sequence',
    easing = 'linear'
  } = props;
  const cloneElement = document.createElement('span');
  const transition = manager === 'decipher'
    ? transitionTextDecipher
    : transitionTextSequence;

  let text: string = initialText;
  let cancelTransition: (() => void) | null = null;

  Object.assign(cloneElement.style, {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  });

  const enter = (): void => {
    cancelTransition?.();
    contentElement.style.visibility = 'hidden';
    rootElement.appendChild(cloneElement);

    cancelTransition = transition({
      text,
      easing,
      duration: node.duration.enter,
      isEntering: true,
      onChange: newText => (cloneElement.textContent = newText),
      onComplete: () => {
        cloneElement.remove();
        contentElement.style.visibility = 'visible';
      }
    });
  };

  const exit = (): void => {
    cancelTransition?.();
    contentElement.style.visibility = 'hidden';
    rootElement.appendChild(cloneElement);

    cancelTransition = transition({
      text,
      easing,
      duration: node.duration.exit,
      isEntering: false,
      onChange: newText => (cloneElement.textContent = newText),
      onComplete: () => {
        cloneElement.remove();
      }
    });
  };

  const animatorSubscription = node.subscribe(() => {
    switch (node.state) {
      case STATES.entering: enter(); break;
      case STATES.exiting: exit(); break;
    }
  });

  const update = (newText: string): void => {
    text = newText;
    switch (node.state) {
      case STATES.entering:
      case STATES.entered: enter(); break;
      case STATES.exiting: exit(); break;
    }
  };

  const cancel = (): void => {
    contentElement.style.visibility = 'visible';
    cloneElement.remove();
    cancelTransition?.();
    animatorSubscription();
  };

  return { update, cancel };
};

export type { CreateTextTransitionerProps, CreateTextTransitioner };
export { createTextTransitioner };
