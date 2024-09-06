import { createBleep } from '@arwes/bleeps'

const rootElement = document.querySelector('#root')!

rootElement.innerHTML = '<button class="bleep">Bleep!</button>'

const bleepElement = rootElement.querySelector('.bleep')!

const bleep = createBleep({
  // Assets by priority.
  sources: [
    { src: '/assets/sounds/click.webm', type: 'audio/webm' },
    { src: '/assets/sounds/click.mp3', type: 'audio/mpeg' }
  ]
  // preload: true,
  // loop: false,
  // volume: 1,
  // fetchHeaders: null,
  // maxPlaybackDelay: 0.25,
  // muteOnWindowBlur: false,
})

bleepElement.addEventListener('click', () => {
  // If conditions are met, the bleep is created and available.
  bleep?.play()
})
