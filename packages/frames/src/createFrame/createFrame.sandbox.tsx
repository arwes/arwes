import { animate } from 'motion'
import { type FrameSettings, createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <div class="box">
    <svg class="frame" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>

  <style>
    .box {
      position: relative;
      width: 100px;
      height: 300px;
    }
    .frame {
      position: absolute;
      inset: 0;
      width: 100%;
      width: round(down, 100%, 1px); /* Prevent clipping errors on decimals. */
      height: 100%;
      height: round(down, 100%, 1px); /* Prevent clipping errors on decimals. */
    }
  </style>
`

const box = root.querySelector<HTMLDivElement>('.box')!
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

// Resize the frame dimensions to see how it re-draws the elements responsively.
animate(
  (progress) => {
    box.style.width = `${100 + progress * 200}px`
    box.style.height = `${300 - progress * 200}px`
  },
  { duration: 3, easing: 'linear', repeat: Infinity, direction: 'alternate' }
)
