import anime from 'animejs';

import { ARWES_CORE_FRAME_BG_CLASSNAME } from '../constants';
import { BUTTON_FRAME_BG_BASE_OPACITY, BUTTON_FRAME_BG_HIGH_OPACITY } from './Button.styles';
import { ArwesTheme } from '../ArwesThemeProvider';

const highlightFrameBgs = (container: HTMLElement, theme: ArwesTheme, palette?: string): void => {
  const color = theme.palette[palette as string]?.main || theme.palette.primary.main;
  const duration = theme.transitionDuration / 2;

  const bgs: HTMLElement[] = Array.from(container.querySelectorAll(`.${ARWES_CORE_FRAME_BG_CLASSNAME}`));

  const overlays: HTMLDivElement[] = bgs.map(bg => {
    const overlay = document.createElement('div');

    overlay.style.position = 'absolute';
    overlay.style.left = '0px';
    overlay.style.right = '0px';
    overlay.style.top = '0px';
    overlay.style.bottom = '0px';
    overlay.style.backgroundColor = color;

    bg.appendChild(overlay);

    return overlay;
  });

  const onComplete = (): void => {
    overlays.forEach(overlay => overlay.remove());
  };

  anime
    .timeline({
      targets: bgs,
      duration: duration / 2,
      easing: 'easeOutSine'
    })
    .add({
      opacity: [BUTTON_FRAME_BG_BASE_OPACITY, BUTTON_FRAME_BG_HIGH_OPACITY]
    })
    .add({
      opacity: [BUTTON_FRAME_BG_HIGH_OPACITY, BUTTON_FRAME_BG_BASE_OPACITY],
      complete: onComplete
    });
};

export { highlightFrameBgs };
