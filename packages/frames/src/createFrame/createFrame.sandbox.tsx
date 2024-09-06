import { type FrameSettings, createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <div>
    <select class="status">
      <option value="normal" selected>normal</option>
      <option value="failure">failure</option>
      <option value="success">success</option>
    </select>
    <select class="size">
      <option value="medium" selected>medium</option>
      <option value="large">large</option>
    </select>
  </div>

  <svg class="frame" xmlns="http://www.w3.org/2000/svg"></svg>

  <style>
    .frame {
      margin-top: 1rem;
      width: 100%;
      width: round(down, 100%, 1px);
      height: 200px;
    }
  </style>
`

const svg = root.querySelector('svg')!
const statusElement = root.querySelector<HTMLSelectElement>('.status')!
const sizeElement = root.querySelector<HTMLSelectElement>('.size')!

type Contexts = {
  status: 'normal' | 'failure' | 'success'
  size: 'medium' | 'large'
}

const settings: FrameSettings<Contexts> = {
  elements: [
    {
      type: 'g',
      name: 'bgs',
      elements: [
        // Background shape.
        {
          name: 'bg',
          style: { strokeWidth: 0 },
          path: [
            ['M', 20, 20],
            ['L', 20, '100% - 20'],
            ['L', '100% - 20', '100% - 20'],
            ['L', '100% - 20', 20]
          ],
          contexts: {
            status: {
              normal: {
                style: { fill: 'hsl(180, 75%, 10%)' }
              },
              failure: {
                style: { fill: 'hsl(10, 75%, 10%)' }
              },
              success: {
                style: { fill: 'hsl(120, 75%, 10%)' }
              }
            }
          }
        }
      ]
    },

    {
      type: 'g',
      name: 'lines',
      elements: [
        // Top line.
        {
          name: 'line',
          style: { fill: 'none' },
          path: [
            ['M', 10, 10],
            ['L', '100% - 10', 10],
            ['L', '100% - 10', 40]
          ],
          contexts: {
            status: {
              normal: {
                style: { stroke: 'hsl(180, 75%, 50%)' }
              },
              failure: {
                style: { stroke: 'hsl(10, 75%, 50%)' }
              },
              success: {
                style: { stroke: 'hsl(120, 75%, 50%)' }
              }
            },
            size: {
              medium: {
                style: { strokeWidth: '1' }
              },
              large: {
                style: { strokeWidth: '2' }
              }
            }
          }
        },

        // Bottom line.
        {
          name: 'line',
          style: { fill: 'none' },
          path: [
            ['M', '100% - 10', '100% - 10'],
            ['L', 10, '100% - 10'],
            ['L', 10, '100% - 40']
          ],
          contexts: {
            status: {
              normal: {
                style: { stroke: 'hsl(180, 75%, 50%)' }
              },
              failure: {
                style: { stroke: 'hsl(10, 75%, 50%)' }
              },
              success: {
                style: { stroke: 'hsl(120, 75%, 50%)' }
              }
            },
            size: {
              medium: {
                style: { strokeWidth: '1' }
              },
              large: {
                style: { strokeWidth: '2' }
              }
            }
          }
        }
      ]
    }
  ],

  contexts: {
    status: {
      initial: 'normal'
    },
    size: {
      initial: 'medium'
    }
  }
}

const frame = createFrame(svg, settings)

statusElement.addEventListener('change', () => {
  frame.transition('status', statusElement.value as Contexts['status'])
})

sizeElement.addEventListener('change', () => {
  frame.transition('size', sizeElement.value as Contexts['size'])
})
