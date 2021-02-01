import { RefObject, MutableRefObject } from 'react';
import { css } from '@emotion/css';
import { AnimatorRef } from '@arwes/animation';
import { Bleeps } from '@arwes/sounds';

import { walkTextNodes } from './utils/walkTextNodes';
import { setTextNodesEnteringContentLength } from './utils/setTextNodesEnteringContentLength';
import { setTextNodesExitingContentLength } from './utils/setTextNodesExitingContentLength';
import { styles } from './Text.styles';

type TextAnimationRefs = MutableRefObject<{
  rootRef: RefObject<HTMLElement>
  actualChildrenRef: RefObject<HTMLElement>
  cloneNode: MutableRefObject<HTMLElement | null>
  blinkNode: MutableRefObject<HTMLElement | null>
  animationFrame: MutableRefObject<number | null>
}>;

const calcelTextAnimation = (animator: AnimatorRef, refs: TextAnimationRefs): void => {
  const { animationFrame } = refs.current;
  window.cancelAnimationFrame(animationFrame.current as number);
};

const stopTextAnimation = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  const {
    rootRef,
    actualChildrenRef,
    cloneNode,
    animationFrame
  } = refs.current;

  // If there is no animation running, nothing needs to be stopped.
  if (animationFrame.current === null) {
    return;
  }

  calcelTextAnimation(animator, refs);

  if (bleeps.typing?.getIsPlaying()) {
    bleeps.typing?.stop();
  }

  if (rootRef.current && cloneNode.current) {
    rootRef.current.removeChild(cloneNode.current);
    cloneNode.current = null;
  }

  const isEntering = animator.flow.entering || animator.flow.entered;

  if (isEntering && actualChildrenRef.current) {
    actualChildrenRef.current.style.opacity = '';
  }

  animationFrame.current = null;
};

const startTextAnimation = (animator: AnimatorRef, refs: TextAnimationRefs, bleeps: Bleeps): void => {
  const {
    rootRef,
    actualChildrenRef,
    cloneNode,
    blinkNode,
    animationFrame
  } = refs.current;

  stopTextAnimation(animator, refs, bleeps);

  // If the animation is run when the element is already ENTERED, it should
  // restart the same entering animation.
  const isEntering = animator.flow.entering || animator.flow.entered;

  const durationTotal = isEntering
    ? animator.duration.enter
    : animator.duration.exit;

  cloneNode.current = actualChildrenRef.current?.cloneNode(true) as HTMLElement;

  const textNodes: Node[] = [];
  const texts: string[] = [];

  walkTextNodes(cloneNode.current, child => {
    textNodes.push(child);
    texts.push(child.textContent || '');

    if (isEntering) {
      child.textContent = '';
    }
  });

  const lengthTotal = texts.join('').length;

  if (!lengthTotal) {
    cloneNode.current = null;
    return;
  }

  if (actualChildrenRef.current) {
    actualChildrenRef.current.style.opacity = '0';
  }

  cloneNode.current.setAttribute('style', '');
  cloneNode.current.setAttribute('class', css(styles.cloneNode));

  rootRef.current?.appendChild(cloneNode.current);

  if (blinkNode.current) {
    cloneNode.current.appendChild(blinkNode.current);
  }

  let timeStart = 0;
  let durationProgress: number = 0;

  const addNextFrame = (callback: (timestamp: number) => void): void => {
    animationFrame.current = window.requestAnimationFrame(callback);
  };

  const runFrame = (timestamp: number): void => {
    if (!timeStart) {
      timeStart = timestamp;
    }

    durationProgress = Math.max(timestamp - timeStart, 0);

    if (!isEntering) {
      durationProgress = durationTotal - durationProgress;
    }

    // partialLength(n) = animationProgressDuration(ms)
    // textTotalLength(n) = totalDuration(ms)
    const lengthNew = Math.round((durationProgress * lengthTotal) / durationTotal);

    if (isEntering) {
      setTextNodesEnteringContentLength(textNodes, texts, lengthNew);
    }
    else {
      setTextNodesExitingContentLength(textNodes, texts, lengthNew, lengthTotal);
    }

    const continueAnimation = isEntering
      ? lengthNew < lengthTotal
      : lengthNew > 0;

    if (continueAnimation) {
      addNextFrame(runFrame);
    }
    else {
      stopTextAnimation(animator, refs, bleeps);
    }
  };

  addNextFrame(runFrame);

  bleeps.typing?.play();
};

export {
  TextAnimationRefs,
  calcelTextAnimation,
  stopTextAnimation,
  startTextAnimation
};
