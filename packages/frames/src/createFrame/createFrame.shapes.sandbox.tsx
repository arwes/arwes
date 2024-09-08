import { createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"></svg>`

const svg = root.querySelector('svg')!

createFrame(svg, {
  elements: [
    {
      type: 'path',
      style: {
        strokeWidth: '2',
        stroke: 'hsl(0, 75%, 50%)',
        fill: 'hsl(0, 75%, 10%)',
        filter: 'drop-shadow(0 0 2px hsl(0, 75%, 50%))'
      },
      path: [
        ['M', 10, 30],
        ['A', 20, 20, 0, 0, 1, 50, 30],
        ['A', 20, 20, 0, 0, 1, 90, 30],
        ['Q', 90, 60, 50, 90],
        ['Q', 10, 60, 10, 30],
        'z'
      ]
    }
  ]
})
