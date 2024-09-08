//
import { createFrame } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `<svg width="100%" height="500" xmlns="http://www.w3.org/2000/svg"></svg>`

const svg = root.querySelector('svg')!
const gradientId = 'gradientId1'
const maskId = 'maskId1'

createFrame(svg, {
  elements: [
    {
      type: 'defs',
      elements: `
        <linearGradient id="${gradientId}">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#000000" />
        </linearGradient>
      `
    },
    {
      type: 'defs',
      elements: [
        {
          type: 'mask',
          id: maskId,
          elements: [
            // A tetragon, the shape element to mask the content.
            {
              style: {
                fill: `url(#${gradientId})`
              },
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
        mask: `url(#${maskId})`
      },
      elements: [
        // A box, the actual rendered masked elements.
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
