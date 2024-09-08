import { type FrameSettings, createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg class="frame" xmlns="http://www.w3.org/2000/svg"></svg>

  <style>
    .frame {
      width: 100%;
      width: round(down, 100%, 1px);
      height: 200px;
    }
  </style>
`

const svg = root.querySelector('svg')!

const settings: FrameSettings = {
  elements: [
    // Top line.
    {
      type: 'path',
      name: 'line',
      style: { stroke: 'hsl(180, 75%, 50%)', strokeWidth: '2', fill: 'none' },
      path: [
        ['M', 1, 31],
        ['v', -20],
        ['l', 10, -10],
        ['H', '100% - 11'],
        ['l', 10, 10],
        ['v', 20]
      ]
    },
    // Bottom line.
    {
      type: 'path',
      name: 'line',
      style: { stroke: 'hsl(180, 75%, 50%)', strokeWidth: '2', fill: 'none' },
      path: [
        ['M', 1, '100% - 31'],
        ['v', 20],
        ['l', 10, 10],
        ['H', '100% - 11'],
        ['l', 10, -10],
        ['v', -20]
      ]
    },
    // Background shape.
    {
      type: 'path',
      name: 'bg',
      style: { strokeWidth: 0, fill: 'hsl(180, 75%, 10%)' },
      path: [
        // Top.
        ['M', 5, 35],
        ['v', -20],
        ['l', 10, -10],
        ['H', '100% - 15'],
        ['l', 10, 10],
        ['v', 20],
        // Bottom.
        ['V', '100% - 15'],
        ['l', -10, 10],
        ['H', 15],
        ['l', -10, -10]
      ]
    }
  ]
}

createFrame(svg, settings)
