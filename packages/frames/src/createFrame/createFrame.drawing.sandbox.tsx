import { createAnimatorSystem } from '@arwes/animator'
import { type AnimatedProp, animateDraw } from '@arwes/animated'
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

const animatedLine: AnimatedProp = {
  transitions: {
    entering: ({ element, duration }) =>
      animateDraw({ isEntering: true, element: element as SVGPathElement, duration }),
    exiting: ({ element, duration }) =>
      animateDraw({ isEntering: false, element: element as SVGPathElement, duration })
  }
}

const settings: FrameSettings = {
  animator,
  elements: [
    {
      type: 'g',
      style: { fill: 'none', strokeWidth: '2', stroke: 'orange' },
      animated: {
        transitions: {
          entering: { opacity: [0, 1, 0.5, 1], x: [50, 0] },
          exiting: { opacity: [1, 0, 0.5, 0], x: [0, 50] }
        }
      },
      elements: [
        {
          animated: animatedLine,
          path: [
            ['M', 1, 51],
            ['v', -20],
            ['c', 0, 0, 0, -30, 100, -30]
          ]
        },
        {
          animated: animatedLine,
          path: [
            ['M', 1, '100% - 51'],
            ['v', 20],
            ['c', 0, 0, 0, 30, 100, 30]
          ]
        }
      ]
    },
    {
      type: 'g',
      style: { fill: 'none', strokeWidth: '2', stroke: 'orange' },
      animated: {
        transitions: {
          entering: { opacity: [0, 1, 0.5, 1], x: [-50, 0] },
          exiting: { opacity: [1, 0, 0.5, 0], x: [0, -50] }
        }
      },
      elements: [
        {
          animated: animatedLine,
          path: [
            ['M', '100% - 1', 51],
            ['v', -20],
            ['c', 0, 0, 0, -30, -100, -30]
          ]
        },
        {
          animated: animatedLine,
          path: [
            ['M', '100% - 1', '100% - 51'],
            ['v', 20],
            ['c', 0, 0, 0, 30, -100, 30]
          ]
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
