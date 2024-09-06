import { createFrameOctagon } from '@arwes/frames'

const root = document.querySelector('#root')!
root.innerHTML = `
  <svg
    width="300"
    height="200"
    style="
      --arwes-frames-bg-color: hsl(180, 75%, 10%);
      --arwes-frames-line-color: hsl(180, 75%, 50%);
    "
    xmlns="http://www.w3.org/2000/svg">
  </svg>
`

const svg = root.querySelector('svg')!

createFrameOctagon(svg, {
  // styled: true,
  // leftTop: true,
  // rightTop: true,
  // rightBottom: true,
  // leftBottom: true,
  // squareSize: 16,
  // strokeWidth: 1,
  // padding: 0
})
