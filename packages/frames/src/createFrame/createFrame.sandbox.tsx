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
    {
      type: 'g',
      name: 'bgs',
      elements: [
        // Background shape.
        {
          type: 'path',
          name: 'bg',
          style: { strokeWidth: 0, fill: 'hsl(180, 75%, 10%)' },
          path: [
            ['M', 20, 20],
            ['L', 20, '100% - 20'],
            ['L', '100% - 20', '100% - 20'],
            ['L', '100% - 20', 20]
          ]
        }
      ]
    },
    {
      type: 'g',
      name: 'lines',
      elements: [
        // Top line.
        {
          type: 'path',
          name: 'line',
          style: { stroke: 'hsl(180, 75%, 50%)', strokeWidth: '1', fill: 'none' },
          path: [
            ['M', 10, 10],
            ['L', '100% - 10', 10],
            ['L', '100% - 10', 40]
          ]
        },
        // Bottom line.
        {
          type: 'path',
          name: 'line',
          style: { stroke: 'hsl(180, 75%, 50%)', strokeWidth: '1', fill: 'none' },
          path: [
            ['M', '100% - 10', '100% - 10'],
            ['L', 10, '100% - 10'],
            ['L', 10, '100% - 40']
          ]
        }
      ]
    }
  ]
}

createFrame(svg, settings)
