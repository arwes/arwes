import { createAnimatorSystem } from '@arwes/animator'
import { createBackgroundPuffs } from '@arwes/bgs'

const root = document.querySelector('#root')!
const canvas = document.createElement('canvas')
Object.assign(canvas.style, { position: 'absolute', inset: 0, width: '100%', height: '100%' })
root.appendChild(canvas)

const system = createAnimatorSystem()
const animator = system.register(undefined, {
  getSettings: () => ({
    duration: {
      // Duration of puffs set.
      interval: 1.5,
      // Duration between one interval animation and the next.
      intervalPause: 0.5
    }
  }),
  setSettings: () => {},
  getForeignRef: () => {},
  setForeignRef: () => {}
})

createBackgroundPuffs({
  canvas,
  animator,
  settingsRef: {
    current: {
      color: 'hsla(60, 100%, 75%, 0.5)',
      quantity: 100,
      padding: 0,
      // Move to the right.
      xOffset: [10, 50],
      // Move to the top.
      yOffset: [-20, -80],
      // Change of puff radius.
      radiusOffset: [4, 20],
      // 1 set per interval animation.
      sets: 1
    }
  }
})

animator.send('setup')
