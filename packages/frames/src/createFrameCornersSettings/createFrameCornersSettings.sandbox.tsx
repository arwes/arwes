import { createFrame, createFrameCornersSettings } from '@arwes/frames'

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

createFrame(
  svg,
  createFrameCornersSettings({
    // styled: true,
    // strokeWidth: 1,
    // cornerLength: 16,
    // padding: 0
  })
)
