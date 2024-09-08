import { createFrameLines, animateFrameAssembler } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg
    style="
      --arwes-frames-bg-color: hsl(180, 75%, 10%);
      --arwes-frames-line-color: hsl(180, 75%, 50%);
    "
    width="300"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
`

const svg = root.querySelector('svg')!

createFrameLines(svg)

let isEntering = false

const animate = (): void => {
  isEntering = !isEntering

  // It will search for elements with the selector:
  // - [data-name="line"]
  // - [data-name="bg"]
  // - [data-name="deco"]
  // And animate them with assembling/disassembling animation.
  animateFrameAssembler({
    element: svg,
    duration: 1,
    isEntering
  })

  setTimeout(animate, 2_000)
}

animate()
