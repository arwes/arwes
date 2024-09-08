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

    .frame-bg { stroke-width: 0; fill: hsl(180, 75%, 10%); }
    .frame-bg-failure { fill: hsl(10, 75%, 10%); }
    .frame-bg-success { fill: hsl(120, 75%, 10%); }

    .frame-line { fill: none; stroke-width: 1; stroke: hsl(180, 75%, 50%); }
    .frame-line-failure { stroke: hsl(10, 75%, 50%); }
    .frame-line-success { stroke: hsl(120, 75%, 50%); }
    .frame-line-large { stroke-width: 2; }
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
    // Background shape.
    {
      name: 'bg',
      className: 'frame-bg',
      path: [
        ['M', 20, 20],
        ['L', 20, '100% - 20'],
        ['L', '100% - 20', '100% - 20'],
        ['L', '100% - 20', 20]
      ],
      contexts: {
        status: {
          failure: { className: 'frame-bg-failure' },
          success: { className: 'frame-bg-success' }
        }
      }
    },
    // Top line.
    {
      name: 'line',
      className: 'frame-line',
      path: [
        ['M', 10, 10],
        ['L', '100% - 10', 10],
        ['L', '100% - 10', 40]
      ],
      contexts: {
        status: {
          failure: { className: 'frame-line-failure' },
          success: { className: 'frame-line-success' }
        },
        size: {
          large: { className: 'frame-line-large' }
        }
      }
    },
    // Bottom line.
    {
      name: 'line',
      className: 'frame-line',
      path: [
        ['M', '100% - 10', '100% - 10'],
        ['L', 10, '100% - 10'],
        ['L', 10, '100% - 40']
      ],
      contexts: {
        status: {
          failure: { className: 'frame-line-failure' },
          success: { className: 'frame-line-success' }
        },
        size: {
          large: { className: 'frame-line-large' }
        }
      }
    }
  ],

  contexts: {
    status: 'normal',
    size: 'medium'
  }
}

const frame = createFrame(svg, settings)

statusElement.addEventListener('change', () => {
  frame.transition('status', statusElement.value as Contexts['status'])
})

sizeElement.addEventListener('change', () => {
  frame.transition('size', sizeElement.value as Contexts['size'])
})
