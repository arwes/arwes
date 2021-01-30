import { css } from '@emotion/css';
import { AnimatorRef } from '@arwes/animation';

import { walkTextNodes } from './walkTextNodes';
import { setTextNodesEnteringContentLength } from './setTextNodesEnteringContentLength';
import { setTextNodesExitingContentLength } from './setTextNodesExitingContentLength';
import { styles } from './Text.styles';

const calcelAnimation = (animator: AnimatorRef, refs: any): void => {
  const { currentAnimationFrame } = refs.current;
  window.cancelAnimationFrame(currentAnimationFrame.current);
};

const stopAnimation = (animator: AnimatorRef, refs: any): void => {
  const {
    rootRef,
    actualChildrenRef,
    currentCloneNode,
    currentAnimationFrame,
    bleeps
  } = refs.current;

  // If there is no animation running, nothing needs to be stopped.
  if (currentAnimationFrame.current === null) {
    return;
  }

  calcelAnimation(animator, refs);

  if (bleeps.typing?.getIsPlaying()) {
    bleeps.typing?.stop();
  }

  if (rootRef.current && currentCloneNode.current) {
    rootRef.current.removeChild(currentCloneNode.current);
    currentCloneNode.current = null;
  }

  const isEntering = animator.flow.entering || animator.flow.entered;

  if (isEntering && actualChildrenRef.current) {
    actualChildrenRef.current.style.opacity = '';
  }

  currentAnimationFrame.current = null;
};

const startAnimation = (animator: AnimatorRef, refs: any): void => {
  const {
    rootRef,
    actualChildrenRef,
    currentCloneNode,
    currentBlinkNode,
    currentAnimationFrame,
    bleeps
  } = refs.current;

  stopAnimation(animator, refs);

  // If the animation is run when the element is already "entered", it should
  // restart the same entering animation.
  const isEntering = animator.flow.entering || animator.flow.entered;

  const durationTotal = isEntering
    ? animator.duration.enter
    : animator.duration.exit;

  currentCloneNode.current = actualChildrenRef.current.cloneNode(true);

  const textNodes: Node[] = [];
  const texts: string[] = [];

  walkTextNodes(currentCloneNode.current, child => {
    textNodes.push(child);
    texts.push(child.textContent || '');

    if (isEntering) {
      child.textContent = '';
    }
  });

  const lengthTotal = texts.join('').length;

  if (!lengthTotal) {
    currentCloneNode.current = null;
    return;
  }

  actualChildrenRef.current.style.opacity = '0';

  currentCloneNode.current.setAttribute('style', '');
  currentCloneNode.current.setAttribute('class', css(styles.cloneNode));

  rootRef.current.appendChild(currentCloneNode.current);

  if (currentBlinkNode.current) {
    currentCloneNode.current.appendChild(currentBlinkNode.current);
  }

  let timeStart = 0;
  let durationProgress: number = 0;

  const addNextFrame = (callback: (timestamp: number) => void): void => {
    currentAnimationFrame.current = window.requestAnimationFrame(callback);
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
      stopAnimation(animator, refs);
    }
  };

  addNextFrame(runFrame);

  bleeps.typing?.play();
};

export { calcelAnimation, stopAnimation, startAnimation };
