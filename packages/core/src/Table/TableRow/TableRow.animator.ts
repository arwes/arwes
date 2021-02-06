import rgba from 'polished/lib/color/rgba';
import anime from 'animejs';
import { RefObject, MutableRefObject } from 'react';
import { AnimatorRef } from '@arwes/animation';

import { TextAnimationRefs, startTextAnimation } from '../../utils/textAnimations';
import { ArwesTheme } from '../../ArwesThemeProvider';

type TableRowAnimateRefs = MutableRefObject<{
  rootRef: RefObject<HTMLDivElement>
}>;

const useAnimateEntering = (
  animator: AnimatorRef,
  animateRefs: TableRowAnimateRefs,
  theme: ArwesTheme
): void => {
  // DEBUG:
  const isHeader = false;

  const tableRow = animateRefs.current.rootRef.current as HTMLElement;
  const cells: HTMLElement[] = Array.from(tableRow.querySelectorAll('.arwes-table__cell'));

  cells.forEach(cell => {
    const cellContainer = cell.querySelector('.arwes-table__cell-container') as HTMLElement;
    const cellContent = cell.querySelector('.arwes-table__cell-content') as HTMLElement;
    const cellLine = cell.querySelector('.arwes-table__cell-line') as HTMLElement;

    const textAnimateRefs: TextAnimationRefs = {
      current: {
        rootRef: { current: cellContainer },
        actualChildrenRef: { current: cellContent },
        cloneNode: { current: null },
        blinkNode: { current: null },
        animationFrame: { current: null }
      }
    };

    cell.style.backgroundColor = rgba(
      theme.palette.text.root,
      isHeader ? 0.15 : 0.05
    );

    startTextAnimation(animator, textAnimateRefs, {});

    anime({
      targets: cell,
      duration: animator.duration.enter,
      translateX: [theme.space(1), 0],
      easing: 'easeOutSine'
    });

    anime({
      targets: cellLine,
      duration: animator.duration.enter,
      width: [0, '100%'],
      easing: 'easeOutSine'
    });
  });
};

const animator = {
  useAnimateEntering
};

export { TableRowAnimateRefs, animator };
