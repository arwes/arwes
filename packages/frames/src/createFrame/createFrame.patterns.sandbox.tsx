import { createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `<svg width="100%" height="500" xmlns="http://www.w3.org/2000/svg"></svg>`

const svg = root.querySelector('svg')!
const patternId = 'patternId1'

createFrame(svg, {
  elements: [
    {
      type: 'defs',
      elements: `
        <pattern
          id="${patternId}"
          patternUnits="userSpaceOnUse"
          width="100"
          height="100"
        >
          <rect
            x="10"
            y="10"
            width="90"
            height="90"
            fill="none"
            stroke="red"
          />
        </pattern>
      `
    },
    {
      type: 'g',
      style: {},
      elements: [
        {
          type: 'rect',
          x: 0,
          y: 0,
          width: '100%',
          height: '100%',
          style: {
            fill: `url(#${patternId})`
          }
        }
      ]
    }
  ]
})
