import { type FrameSettings, createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <div>
    <select class="variant">
      <option value="first" selected>first</option>
      <option value="second">second</option>
      <option value="third">third</option>
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
const variantElement = root.querySelector<HTMLSelectElement>('.variant')!

type Contexts = {
  variant: 'first' | 'second' | 'third'
}

const settings: FrameSettings<Contexts> = {
  elements: [
    {
      type: 'path',
      style: {
        fill: 'none',
        stroke: 'hsl(0 75% 50%)',
        strokeWidth: '2',
        transition: 'all ease-out 200ms'
      },
      path: [],
      contexts: {
        variant: {
          first: { path: [['M', 10, 10], ['L', 90, 90], ['L', 10, 90], 'z'] },
          second: { path: [['M', 50, 10], ['L', 90, 90], ['L', 10, 90], 'z'] },
          third: { path: [['M', 90, 10], ['L', 90, 90], ['L', 10, 90], 'z'] }
        }
      }
    },
    {
      type: 'rect',
      style: {
        fill: 'none',
        stroke: 'hsl(100 75% 50%)',
        strokeWidth: '2',
        transition: 'all ease-out 200ms'
      },
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      contexts: {
        variant: {
          first: { x: 110, y: 10, width: 80, height: 80, rx: 0, ry: 0 },
          second: { x: 120, y: 20, width: 60, height: 60, rx: 4, ry: 4 },
          third: { x: 130, y: 30, width: 40, height: 40, rx: 8, ry: 8 }
        }
      }
    },
    {
      type: 'circle',
      style: {
        fill: 'none',
        stroke: 'hsl(200 75% 50%)',
        strokeWidth: '2',
        transition: 'all ease-out 200ms'
      },
      cx: 0,
      cy: 0,
      r: 0,
      contexts: {
        variant: {
          first: { cx: 50, cy: 150, r: 40 },
          second: { cx: 30, cy: 130, r: 20 },
          third: { cx: 70, cy: 170, r: 20 }
        }
      }
    },
    {
      type: 'ellipse',
      style: {
        fill: 'none',
        stroke: 'hsl(300 75% 50%)',
        strokeWidth: '2',
        transition: 'all ease-out 200ms'
      },
      cx: 0,
      cy: 0,
      rx: 0,
      ry: 0,
      contexts: {
        variant: {
          first: { cx: 150, cy: 150, rx: 40, ry: 20 },
          second: { cx: 130, cy: 130, rx: 20, ry: 10 },
          third: { cx: 170, cy: 170, rx: 10, ry: 20 }
        }
      }
    }
  ],

  contexts: {
    variant: 'first'
  }
}

const frame = createFrame(svg, settings)

variantElement.addEventListener('change', () => {
  frame.transition('variant', variantElement.value as Contexts['variant'])
})
