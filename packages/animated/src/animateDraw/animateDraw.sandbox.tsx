import { animateDraw } from '@arwes/animated'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 1, 1 H 150 V 199 H 299"
      stroke="cyan"
      fill="none"
    />
  </svg>
`

const path = root.querySelector('path')!

animateDraw({
  element: path,
  duration: 1
  // isEntering: true,
  // delay: 0,
  // easing: undefined,
})
