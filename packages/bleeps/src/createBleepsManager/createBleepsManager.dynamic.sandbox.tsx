import { createBleepsManager } from '@arwes/bleeps';

const rootElement = document.querySelector('#root') as HTMLElement;

rootElement.innerHTML = `
  <div style="color:#ddd;">
    <div style="margin-bottom:20px;">
      <label>
        Global Volume
        <input
          class="volume"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value="1"
        />
      </label>

      <label>
        <input class="disable" type="checkbox">
        <span>Disable Bleeps</span>
      </label>
    </div>

    <div>
      <button class="click">Click</button>
      <button class="error">Error</button>
      <button class="assemble">Readout</button>
    </div>
  </div>
`;

const volumeElement = rootElement.querySelector('.volume') as HTMLInputElement;
const disableElement = rootElement.querySelector('.disable') as HTMLInputElement;
const clickElement = rootElement.querySelector('.click') as HTMLButtonElement;
const errorElement = rootElement.querySelector('.error') as HTMLButtonElement;
const assembleElement = rootElement.querySelector('.assemble') as HTMLButtonElement;

type BleepNames = 'click' | 'error' | 'assemble';

const bleepsManager = createBleepsManager<BleepNames>({
  global: {
    volume: 1
  },
  categories: {
    interaction: {
      volume: 0.25
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

volumeElement.addEventListener('change', () => {
  const volume = volumeElement.valueAsNumber;
  bleepsManager?.update({
    global: { volume }
  });
});

disableElement.addEventListener('change', () => {
  const disabled = disableElement.checked;
  bleepsManager?.update({
    common: { disabled }
  });
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
