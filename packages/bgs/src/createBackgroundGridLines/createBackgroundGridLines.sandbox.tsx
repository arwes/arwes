import { createAnimatorSystem } from '@arwes/animator'
import { createBackgroundGridLines } from '@arwes/bgs'

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

createBackgroundGridLines({
  canvas,
  animator,
  settingsRef: {
    current: {
      lineColor: 'hsla(180, 100%, 75%, 0.2)',
      lineWidth: 2,
      distance: 40,
      horizontalLineDash: [4, 2],
      verticalLineDash: []
    }
  }
})

const update = (): void => {
  active = !active
  animator.send('update')
  setTimeout(update, active ? 3_000 : 1_500)
}

animator.send('setup')
update()
