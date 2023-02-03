import { easing, createAnimation } from '@arwes/animated';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <style>
    .easings {
      display: grid;
      gap: 4px;
    }
    .item {
      padding: 2px;
      width: 80px;
      background-color: #077;
      color: #fff;
    }
  </style>

  <div class="easings"></div>
`;

const easingsElement = rootElement.querySelector('.easings') as HTMLDivElement;
const easingNames = Object.keys(easing) as Array<keyof typeof easing>;

easingNames.forEach(easingName => {
  const itemElement = document.createElement('div');
  itemElement.classList.add('item');
  itemElement.textContent = easingName;
  easingsElement.appendChild(itemElement);

  createAnimation({
    duration: 1,
    easing: easingName,
    onUpdate: progress => {
      itemElement.style.transform = `translateX(${progress * 200}px)`;
    }
  });
});
