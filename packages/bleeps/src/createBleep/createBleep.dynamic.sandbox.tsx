import { createBleep } from '@arwes/bleeps';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <button class="bleep">Bleep</button>
  <button class="update">Volume Down</button>
`;

const bleepElement = rootElement.querySelector('.bleep') as HTMLButtonElement;
const updateElement = rootElement.querySelector('.update') as HTMLButtonElement;

let volume = 1;

const bleep = createBleep({
  sources: [
    { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
  ],
  volume
});

bleepElement.addEventListener('click', () => {
  bleep?.play();
});

updateElement.addEventListener('click', () => {
  if (bleep) {
    const isVolumeUp = volume === 1;
    volume = isVolumeUp ? 0.25 : 1;

    bleep.update({ volume });
    updateElement.textContent = isVolumeUp ? 'Volume Up' : 'Volume Down';
  }
});
