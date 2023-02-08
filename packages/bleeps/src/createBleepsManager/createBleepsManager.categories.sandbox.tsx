import { createBleepsManager } from '@arwes/bleeps';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <button class="click">Click</button>
  <button class="error">Error</button>
  <button class="assemble">Readout</button>
`;

const clickElement = rootElement.querySelector('.click') as HTMLButtonElement;
const errorElement = rootElement.querySelector('.error') as HTMLButtonElement;
const assembleElement = rootElement.querySelector('.assemble') as HTMLButtonElement;

type BleepNames = 'click' | 'error' | 'assemble';

const bleepsManager = createBleepsManager<BleepNames>({
  common: {
    volume: 0.5
  },
  categories: {
    interaction: {
      volume: 0
    },
    notification: {
      volume: 0.5
    },
    transition: {
      volume: 1
    }
  },
  bleeps: {
    click: {
      category: 'interaction',
      sources: [{ src: '/assets/sounds/click.webm', type: 'audio/webm' }]
    },
    error: {
      category: 'notification',
      sources: [{ src: '/assets/sounds/error.webm', type: 'audio/webm' }]
    },
    assemble: {
      category: 'transition',
      sources: [{ src: '/assets/sounds/assemble.webm', type: 'audio/webm' }]
    }
  }
});

clickElement.addEventListener('click', () => {
  bleepsManager?.bleeps.click?.play();
});

errorElement.addEventListener('click', () => {
  bleepsManager?.bleeps.error?.play();
});

assembleElement.addEventListener('click', () => {
  bleepsManager?.bleeps.assemble?.play();
});
