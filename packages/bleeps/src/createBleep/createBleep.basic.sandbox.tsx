import { createBleep } from '@arwes/bleeps';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = '<button class="bleep">Bleep!</button>';

const bleepElement = rootElement.querySelector('.bleep') as HTMLButtonElement;

const bleep = createBleep({
  sources: [
    { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
  ]
});

bleepElement.addEventListener('click', () => {
  bleep?.play();
});
