import { RefObject, MutableRefObject } from 'react';
import { CSSObject, css } from '@emotion/css';
import { AnimatorRef } from '@arwes/animation';

import { walkTextNodes } from '../walkTextNodes';
import { setTextNodesEnteringContentLength } from '../setTextNodesEnteringContentLength';
import { setTextNodesExitingContentLength } from '../setTextNodesExitingContentLength';

type TextAnimationRefs = MutableRefObject<{
  rootRef: RefObject<HTMLElement | null>
  actualChildrenRef: RefObject<HTMLElement | null>
  cloneNode: MutableRefObject<HTMLElement | null>
  blinkNode: MutableRefObject<HTMLElement | null>
  animationFrame: MutableRefObject<number | null>
}>;

// TODO: Since these styles could be used simultaneously by many components,
// should these styles be memoized to improve performance?
const styles: Record<string, CSSObject> = {
  cloneNode: {
    display: 'inline-block',
    position: 'absolute',
    zIndex: 0,
    left: '0',
    right: '0',
    top: '0',
    overflow: 'hidden',
    userSelect: 'none'
  }
};

const stopTextAnimation = (animator: AnimatorRef, refs: TextAnimationRefs): void => {
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

  window.cancelAnimationFrame(animationFrame.current);

  if (rootRef.current && cloneNode.current) {
    rootRef.current.removeChild(cloneNode.current);
    cloneNode.current = null;
  }

  const isEntering = animator.flow.entering || animator.flow.entered;

  if (isEntering && actualChildrenRef.current) {
    actualChildrenRef.current.style.opacity = '1';
  }

  animationFrame.current = null;
};

const startTextAnimation = (animator: AnimatorRef, refs: TextAnimationRefs, callback?: () => void): void => {
  const {
    rootRef,
    actualChildrenRef,
    cloneNode,
    blinkNode,
    animationFrame
  } = refs.current;

  stopTextAnimation(animator, refs);

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
      stopTextAnimation(animator, refs);
      callback?.();
    }
  };

  addNextFrame(runFrame);
};

export {
  TextAnimationRefs,
  stopTextAnimation,
  startTextAnimation
};
