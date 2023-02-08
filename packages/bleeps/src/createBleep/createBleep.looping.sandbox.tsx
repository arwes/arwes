import { createBleep } from '@arwes/bleeps';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = '<button class="bleep">Play</button>';

const bleepElement = rootElement.querySelector('.bleep') as HTMLButtonElement;

const bleep = createBleep({
  sources: [{ src: '/assets/sounds/type.mp3', type: 'audio/mpeg' }],
  loop: true,
  volume: 0.5
});

bleepElement.addEventListener('click', () => {
  if (bleep) {
    if (bleep.isPlaying) {
      bleep.stop();
      bleepElement.textContent = 'Play';
    }
    else {
      bleep.play();
      bleepElement.textContent = 'Stop';
    }
  }
});
