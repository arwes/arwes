import { createAnimatorSystem } from '@arwes/animator'
import { createBackgroundDots } from '@arwes/bgs'

const root = document.querySelector('#root')!
const canvas = document.createElement('canvas')
Object.assign(canvas.style, { position: 'absolute', inset: 0, width: '100%', height: '100%' })
root.appendChild(canvas)

let active = false
const system = createAnimatorSystem()
const animator = system.register(undefined, {
  getSettings: () => ({ active, duration: { enter: 1, exit: 1 } }),
  setSettings: () => {},
  getForeignRef: () => {},
  setForeignRef: () => {}
})

createBackgroundDots({
  canvas,
  animator,
  settingsRef: {
    current: {
      color: 'hsla(180, 100%, 75%, 0.25)',
      distance: 50,
      size: 45,
      origin: 'top'
    }
  }
})

const update = (): void => {
  active = !active
  animator.send('update')
  setTimeout(update, active ? 2_000 : 1_500)
}

animator.send('setup')
update()
