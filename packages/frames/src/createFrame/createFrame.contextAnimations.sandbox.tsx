import { type FrameSettings, createFrame } from '@arwes/frames'
import { spring } from 'motion'

const root = document.querySelector('#root')!
root.innerHTML = `
  <p style="color: #ccc;">Click to activate</p>
  <svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg"></svg>
`

const svg = root.querySelector('svg')!

type Contexts = {
  status: 'normal' | 'active'
  selection: 'auto' | 'hovered'
}

const settings: FrameSettings<Contexts> = {
  elements: [
    {
      type: 'g',
      style: { fill: 'none', strokeWidth: '2' },
      contexts: {
        status: {
          normal: { style: { stroke: 'red' } },
          active: { style: { stroke: 'yellow' } }
        }
      },
      elements: [
        {
          path: [
            ['M', 20, 40],
            ['v', -10],
            ['l', 10, -10],
            ['h', 10]
          ],
          contexts: {
            selection: {
              auto: { animate: { x: 0, y: 0 } },
              hovered: { animate: { x: -10, y: -10 } }
            }
          }
        },
        {
          path: [
            ['M', '100% - 40', 20],
            ['h', 10],
            ['l', 10, 10],
            ['v', 10]
          ],
          contexts: {
            selection: {
              auto: { animate: { x: 0, y: 0 } },
              hovered: { animate: { x: 10, y: -10 } }
            }
          }
        },
        {
          path: [
            ['M', '100% - 20', '100% - 40'],
            ['v', 10],
            ['l', -10, 10],
            ['h', -10]
          ],
          contexts: {
            selection: {
              auto: { animate: { x: 0, y: 0 } },
              hovered: { animate: { x: 10, y: 10 } }
            }
          }
        },
        {
          path: [
            ['M', 40, '100% - 20'],
            ['h', -10],
            ['l', -10, -10],
            ['v', -10]
          ],
          contexts: {
            selection: {
              auto: { animate: { x: 0, y: 0 } },
              hovered: { animate: { x: -10, y: 10 } }
            }
          }
        }
      ]
    },
    {
      type: 'g',
      style: { transformOrigin: 'center' },
      contexts: {
        selection: {
          auto: { animate: { scale: 1, easing: spring() } },
          hovered: { animate: { scale: 1.25, easing: spring(), duration: 0.6 } }
        }
      },
      elements: [
        {
          style: { strokeWidth: '2' },
          path: [
            ['M', '50% - 4', '50% - 40'],
            ['h', 8],
            ['l', 40 - 4, 80 - 4],
            ['l', -8, 8],
            ['h', -80 + 16],
            ['l', -8, -8],
            'z'
          ],
          contexts: {
            status: {
              normal: { style: { stroke: 'red', fill: 'hsl(0 50% 50% / 0.2)' } },
              active: { style: { stroke: 'yellow', fill: 'hsl(60 50% 50% / 0.2)' } }
            }
          }
        },
        {
          type: 'svg',
          viewBox: '0 0 24 24',
          x: '50% - 25',
          y: '50% - 15',
          width: 50,
          height: 50,
          style: { fill: 'red' },
          contexts: {
            status: {
              normal: { style: { fill: 'red' } },
              active: { style: { fill: 'yellow' } }
            }
          },
          elements: `
            <path d='M12 18C12.6904 18 13.25 17.4404 13.25 16.75C13.25 16.0596 12.6904 15.5 12 15.5C11.3096 15.5 10.75 16.0596 10.75 16.75C10.75 17.4404 11.3096 18 12 18Z' />
            <path d='M11 6H13V14H11V6Z' />
          `
        }
      ]
    }
  ],

  contexts: {
    status: 'normal',
    selection: 'auto'
  }
}

const frame = createFrame(svg, settings)

svg.addEventListener('mouseenter', () => frame.transition('selection', 'hovered'))
svg.addEventListener('mouseleave', () => frame.transition('selection', 'auto'))

svg.addEventListener('click', () =>
  frame.transition('status', frame.contexts.status === 'normal' ? 'active' : 'normal')
)
