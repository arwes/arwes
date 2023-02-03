import { createAnimation } from '@arwes/animated';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <style>
    .item {
      margin: 20px;
      width: 40px;
      height: 40px;
      background-color: #0ff;
    }
  </style>

  <div class="item"></div>
`;

const itemElement = rootElement.querySelector('.item') as HTMLDivElement;

createAnimation({
  duration: 1,
  easing: 'inOutSine',
  onUpdate: progress => {
    itemElement.style.transform = `translateX(${progress * 200}px)`;
  },
  onComplete: () => {
    itemElement.style.backgroundColor = '#ff0';
  }
});
