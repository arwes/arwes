import rgba from 'polished/lib/color/rgba';
import anime from 'animejs';
import { RefObject, MutableRefObject } from 'react';
import { AnimatorRef } from '@arwes/animation';

import {
  TextAnimationRefs,
  startTextAnimation,
  stopTextAnimation
} from '../../utils/textAnimations';
import { ArwesTheme } from '../../ArwesThemeProvider';

type TableRowAnimateRefs = MutableRefObject<{
  rootRef: RefObject<HTMLDivElement>
  textAnimateRefsCollection: MutableRefObject<TextAnimationRefs[]>
}>;

const stopTableAnimation = (animator: AnimatorRef, refs: TableRowAnimateRefs): void => {
  const tableRow = refs.current.rootRef.current as HTMLElement;

  if (tableRow) {
    const cells: HTMLElement[] = Array.from(tableRow.querySelectorAll('.arwes-table__cell'));

    cells.forEach(cell => {
      const cellLine = cell.querySelector('.arwes-table__cell-line') as HTMLElement;

      anime.remove(cell);
      anime.remove(cellLine);
    });
  }

  if (refs.current.textAnimateRefsCollection.current.length) {
    refs.current.textAnimateRefsCollection.current.forEach(refs => {
      stopTextAnimation(animator, refs, {});
    });

    refs.current.textAnimateRefsCollection.current = [];
  }
};

const startTableAnimation = (
  animator: AnimatorRef,
  refs: TableRowAnimateRefs,
  theme: ArwesTheme,
  isHeader: boolean
): void => {
  stopTableAnimation(animator, refs);

  const isEntering = animator.flow.entering || animator.flow.entered;

  const tableRow = refs.current.rootRef.current as HTMLElement;
  const cells: HTMLElement[] = Array.from(tableRow.querySelectorAll('.arwes-table__cell'));

  refs.current.textAnimateRefsCollection.current = [];

  cells.forEach(cell => {
    const cellContainer = cell.querySelector('.arwes-table__cell-container') as HTMLElement;
    const cellContent = cell.querySelector('.arwes-table__cell-content') as HTMLElement;
    const cellLine = cell.querySelector('.arwes-table__cell-line') as HTMLElement;

    const cellTextAnimationRefs = {
      current: {
        rootRef: { current: cellContainer },
        actualChildrenRef: { current: cellContent },
        cloneNode: { current: null },
        blinkNode: { current: null },
        animationFrame: { current: null }
      }
    };

    refs.current.textAnimateRefsCollection.current.push(cellTextAnimationRefs);

    cell.style.backgroundColor = isEntering
      ? rgba(theme.palette.text.root, isHeader ? 0.15 : 0.05)
      : '';

    startTextAnimation(animator, cellTextAnimationRefs, {});

    anime({
      targets: cell,
      duration: animator.duration.enter,
      translateX: isEntering ? [theme.space(1), 0] : [0, theme.space(1)],
      easing: 'easeOutSine'
    });

    anime({
      targets: cellLine,
      duration: animator.duration.enter,
      width: isEntering ? [0, '100%'] : ['100%', 0],
      easing: 'easeOutSine'
    });
  });
};

const animator = {
  useAnimateEntering: startTableAnimation,
  useAnimateExiting: startTableAnimation,
  useAnimateUnmount: stopTableAnimation
};

export { TableRowAnimateRefs, animator };
