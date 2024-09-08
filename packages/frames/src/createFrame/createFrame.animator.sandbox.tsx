import { createAnimatorSystem } from '@arwes/animator'
import { type FrameSettings, createFrame } from '@arwes/frames'

let active = false

const system = createAnimatorSystem()
const animator = system.register(undefined, {
  getSettings: () => ({ active, duration: { enter: 1, exit: 1 } }),
  setSettings: () => {},
  getForeignRef: () => {},
  setForeignRef: () => {}
})

const root = document.querySelector('#root')!
root.innerHTML = `<svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg"></svg>`

const svg = root.querySelector('svg')!

const settings: FrameSettings = {
  animator,
  elements: [
    {
      type: 'g',
      style: { fill: 'yellow' },
      animated: {
        transitions: {
          entering: { opacity: [0, 1, 0.5, 1], x: [50, 0], duration: 0.8, easing: 'outExpo' },
          exiting: { opacity: [1, 0, 0.5, 0], x: [0, 50], duration: 0.6, easing: 'outExpo' }
        }
      },
      elements: [
        {
          path: [
            ['M', '50% - 100', '50% - 75'],
            ['h', 10],
            ['l', -30, 40],
            ['v', 25],
            ['h', -10],
            ['v', -25]
          ]
        },
        {
          path: [
            ['M', '50% - 100', '50% + 75'],
            ['h', 10],
            ['l', -30, -40],
            ['v', -25],
            ['h', -10],
            ['v', 25]
          ]
        }
      ]
    },
    {
      type: 'g',
      style: { fill: 'yellow' },
      animated: {
        transitions: {
          entering: { opacity: [0, 1, 0.5, 1], x: [-50, 0], duration: 0.8, easing: 'outExpo' },
          exiting: { opacity: [1, 0, 0.5, 0], x: [0, -50], duration: 0.6, easing: 'outExpo' }
        }
      },
      elements: [
        {
          path: [
            ['M', '50% + 100', '50% - 75'],
            ['h', -10],
            ['l', 30, 40],
            ['v', 25],
            ['h', 10],
            ['v', -25]
          ]
        },
        {
          path: [
            ['M', '50% + 100', '50% + 75'],
            ['h', -10],
            ['l', 30, -40],
            ['v', -25],
            ['h', 10],
            ['v', 25]
          ]
        }
      ]
    },
    {
      type: 'g',
      style: { transformOrigin: 'center' },
      animated: {
        initialStyle: { scale: 0.75 },
        transitions: {
          entering: { opacity: [0, 1], scale: [0.75, 1], duration: 1 },
          exiting: { opacity: [1, 0], scale: [1, 0.75], duration: 0.6 }
        }
      },
      elements: [
        {
          type: 'svg',
          viewBox: '0 0 20 20',
          x: '50% - 50',
          y: '50% - 50',
          width: 100,
          height: 100,
          style: { fill: 'yellow' },
          elements: `<path d="M13.728 1H6.272L1 6.272V13.728L6.272 19H13.728L19 13.728V6.272L13.728 1ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" />`
        }
      ]
    }
  ]
}

createFrame(svg, settings)

const update = (): void => {
  active = !active
  animator.send('update')
  setTimeout(update, active ? 3_000 : 1_500)
}

animator.send('setup')
update()
