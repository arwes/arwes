import { AnimatorNode, ANIMATOR_STATES as STATES } from '@arwes/animator';

import { transitionTextSequence } from '../transitionTextSequence/index';

interface CreateTextTransitionerProps {
  node: AnimatorNode
  rootElement: HTMLElement
  contentElement: HTMLElement
  initialText: string
}

interface CreateTextTransitioner {
  update: (text: string) => void
  cancel: () => void
}

const createTextTransitioner = (props: CreateTextTransitionerProps): CreateTextTransitioner => {
  const { node, rootElement, contentElement, initialText } = props;
  const cloneElement = document.createElement('span');

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

    cancelTransition = transitionTextSequence({
      text,
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

    cancelTransition = transitionTextSequence({
      text,
      duration: node.duration.exit,
      isEntering: false,
      onChange: newText => (cloneElement.textContent = newText),
      onComplete: () => cloneElement.remove()
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
    cancelTransition?.();
    cloneElement.remove();
    animatorSubscription();
  };

  return { update, cancel };
};

export type { CreateTextTransitionerProps, CreateTextTransitioner };
export { createTextTransitioner };
