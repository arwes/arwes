import { createAnimatorSystem } from '@arwes/animator'
import { createBackgroundMovingLines } from '@arwes/bgs'

const root = document.querySelector('#root')!
const canvas = document.createElement('canvas')
Object.assign(canvas.style, { position: 'absolute', inset: 0, width: '100%', height: '100%' })
root.appendChild(canvas)

let active = false
const system = createAnimatorSystem()
const animator = system.register(undefined, {
  getSettings: () => ({ active, duration: { enter: 0.5, exit: 0.5 } }),
  setSettings: () => {},
  getForeignRef: () => {},
  setForeignRef: () => {}
})

createBackgroundMovingLines({
  canvas,
  animator,
  settingsRef: {
    current: {
      lineColor: 'hsla(180, 100%, 75%, 0.25)',
      distance: 20,
      sets: 20
    }
  }
})

const update = (): void => {
  active = !active
  animator.send('update')
  setTimeout(update, active ? 5_000 : 1_000)
}

animator.send('setup')
update()
