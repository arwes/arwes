import { animateMorph } from '@arwes/animated'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    <path d="" stroke="cyan" fill="none" />
  </svg>
`

const path = root.querySelector('path')!

animateMorph({
  element: path,
  duration: 1,
  from: [
    ['M', 1, 1],
    ['L', 150, 1],
    ['L', 150, 199],
    ['L', 299, 199]
  ],
  to: [
    ['M', 50, 199],
    ['L', 100, 199],
    ['L', 200, 1],
    ['L', 250, 1]
  ],
  easing: 'inOutSine'
})
