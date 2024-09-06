/* eslint-disable */

const elements = [
  {
    name: 'line',
    path: [
      ['M', 10, 10],
      ['L', '100% - 10', 10],
      ['L', '100% - 10', 40]
    ],
    strokeWidth: '1',
    stroke: 'hsl(180, 75%, 50%)',
    fill: 'none'
  },
  {
    type: 'group',
    name: 'lines',
    strokeWidth: '1',
    stroke: 'hsl(180, 75%, 50%)',
    fill: 'none',
    scale: 0.75,
    children: [
      {
        name: 'line',
        path: [
          ['M', 10, 10],
          ['L', '100% - 10', 10],
          ['L', '100% - 10', 40]
        ]
      }
    ]
  },
  {
    name: 'line',
    strokeWidth: '1',
    contexts: {
      structure: {
        static: {
          path: [
            ['M', '100% - 10', '100% - 10'],
            ['L', 10, '100% - 10'],
            ['L', 10, '100% - 40']
          ]
        },
        enabled: {
          path: [
            ['M', '100% - 20', '100% - 20'],
            ['L', 20, '100% - 20'],
            ['L', 20, '100% - 80']
          ]
        }
      },
      status: {
        normal: {
          duration: 0.2,
          easing: 'outSine',
          stroke: 'hsl(180, 75%, 50%)',
          scale: 1
        },
        active: {
          stroke: 'hsl(60, 75%, 50%)',
          scale: 1.25
        },
        success: {
          stroke: 'hsl(120, 75%, 50%)',
          scale: 1
        },
        failure: {
          stroke: 'hsl(10, 75%, 50%)',
          scale: 1
        }
      },
      selection: {
        none: {
          fill: 'hsl(180, 50%, 50%)',
          animate: ({ element, duration }) => animate(element, { rotate: 0 }, { duration })
        },
        hovered: {
          fill: 'hsl(180, 100%, 50%)',
          animate: ({ element, duration }) => animate(element, { rotate: 45 }, { duration })
        }
      }
    },
    animated: {
      initialStyle: {
        x: 0.5
      },
      initialAttributes: {},
      transitions: {
        entering: {
          opacity: [0, 1, 0.5, 1],
          scale: 1,
          duration: 0.2,
          easing: 'outSine',
          animations: ['draw'] // stroke-dasharray, stroke-dashoffset
        },
        exiting: {
          opacity: [1, 0, 0.5, 0],
          scale: 0.5,
          animations: ['undraw'] // stroke-dasharray, stroke-dashoffset
        }
      }
    },
    timeline: [
      { at: 0, duration: 0.2, fill: 'hsl(180, 50%, 50%)' },
      { at: 0.5, duration: 0.2, fill: 'hsl(180, 50%, 50%)' },
      {
        at: 1,
        duration: 0.2,
        path: [
          ['M', '100% - 20', '100% - 20'],
          ['L', 20, '100% - 20'],
          ['L', 20, '100% - 80']
        ]
      }
    ]
  }
]

const contexts = {
  structure: {
    initial: 'static'
  },
  status: {
    initial: 'normal'
  },
  selection: {
    initial: 'none'
  }
}

// Element styles:
// - CSS: opacity, transform, filter, color.
// - SVG: fill, stroke, stroke-width.

const frame = createFrame(svg, {
  container: svg.querySelector('#container'),
  elements,
  animator,
  contexts
})

frame.render()

frame.transition('structure', 'enabled')
frame.transition('status', 'success')
frame.transition('selection', 'hovered')
frame.reset()
frame.cancel()

frame.remove()

//

const Frame = (props) => {
  const { state, elements, children } = props

  const elementRef = useRef()
  const containerRef = useRef()
  const animator = useAnimator()

  useEffect(() => {
    const frame = createFrame(elementRef.current, {
      elements: elements,
      container: containerRef.current,
      animator
    })

    return () => frame.cancel()
  }, [elements])

  useEffect(() => {
    frame.transition(state)
  }, [state])

  return (
    <svg ref={elementRef}>
      {children}
      <g ref={containerRef} />
    </svg>
  )
}

//

const elementRef = useRef()
const frameRef = useRef()

frameRef.current.transition('status', 'active')

frameRef.current.transition('selection', 'hovered')
frameRef.current.transition('selection', 'none')

render(
  <Frame elementRef={elementRef} frameRef={frameRef} elements={elements} contexts={contexts} />
)
