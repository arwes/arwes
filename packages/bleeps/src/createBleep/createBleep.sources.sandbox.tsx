import { createBleep } from '@arwes/bleeps';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <button class="playAll">Play All</button>
  <button class="stopOne">Stop One</button>
  <button class="stopAll">Stop All</button>
`;

const playAllElement = rootElement.querySelector('.playAll') as HTMLButtonElement;
const stopOneElement = rootElement.querySelector('.stopOne') as HTMLButtonElement;
const stopAllElement = rootElement.querySelector('.stopAll') as HTMLButtonElement;

const typeBleep = createBleep({
  sources: [
    { src: '/assets/sounds/type.webm', type: 'audio/webm' },
    { src: '/assets/sounds/type.mp3', type: 'audio/mpeg' }
  ],
  loop: true
});

playAllElement.addEventListener('click', () => {
  typeBleep?.play('A');
  typeBleep?.play('B');
  typeBleep?.play('C');
});

stopOneElement.addEventListener('click', () => {
  typeBleep?.stop('B');
});

stopAllElement.addEventListener('click', () => {
  typeBleep?.stop('A');
  typeBleep?.stop('B');
  typeBleep?.stop('C');
});
