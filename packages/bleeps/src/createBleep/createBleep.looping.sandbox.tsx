import { createBleep } from '@arwes/bleeps'

const rootElement = document.querySelector('#root')!

rootElement.innerHTML = '<button class="bleep">Play</button>'

const bleepElement = rootElement.querySelector('.bleep')!

const bleep = createBleep({
  sources: [{ src: '/assets/sounds/type.mp3', type: 'audio/mpeg' }],
  volume: 0.5,
  loop: true,
  muteOnWindowBlur: true
})

bleepElement.addEventListener('click', () => {
  if (bleep) {
    if (bleep.isPlaying) {
      bleep.stop()
      bleepElement.textContent = 'Play'
    } else {
      bleep.play()
      bleepElement.textContent = 'Stop'
    }
  }
})
