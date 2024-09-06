import { createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg
    width="100%"
    height="500"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
`

const svg = root.querySelector('svg')!

const clipPathId = 'clipPathId'

createFrame(svg, {
  elements: [
    {
      type: 'defs',
      elements: [
        {
          type: 'clipPath',
          id: clipPathId,
          elements: [
            // A tetragon, the shape element to clip content.
            {
              path: [
                ['M', 20, 20],
                ['L', 20, '100% - 20'],
                ['L', '100% - 20', '50% + 100'],
                ['L', '100% - 20', '50% - 100'],
                'Z'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'g',
      style: {
        clipPath: `url(#${clipPathId})`
      },
      elements: [
        // A box, the actual rendered clipped elements.
        {
          style: {
            fill: 'hsla(180, 50%, 15%)'
          },
          path: [['M', 0, 0], ['L', '100%', 0], ['L', '100%', '100%'], ['L', 0, '100%'], 'Z']
        }
      ]
    }
  ]
})
