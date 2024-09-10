import { createFrame, createFrameHeaderSettings } from '@arwes/frames'
import { createAnimatorSystem } from '@arwes/animator'

let active = false
const system = createAnimatorSystem()
const animator = system.register(undefined, {
  getSettings: () => ({ active, duration: { enter: 1, exit: 1 } }),
  setSettings: () => {},
  getForeignRef: () => {},
  setForeignRef: () => {}
})

const root = document.querySelector('#root')!
root.innerHTML = `
  <div
    style="
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      --arwes-frames-bg-color: hsl(180, 75%, 10%);
      --arwes-frames-line-color: hsl(180, 75%, 25%);
      --arwes-frames-deco-color: hsl(180, 75%, 50%);
    "
  >
    <svg class="frame frame1" width="100%" height="50" xmlns="http://www.w3.org/2000/svg"></svg>
    <svg class="frame frame2" width="100%" height="50" xmlns="http://www.w3.org/2000/svg"></svg>
    <svg class="frame frame3" width="100%" height="50" xmlns="http://www.w3.org/2000/svg"></svg>
    <svg class="frame frame4" width="100%" height="50" xmlns="http://www.w3.org/2000/svg"></svg>

    <svg class="frame frame5" width="50" height="300" xmlns="http://www.w3.org/2000/svg"></svg>
    <svg class="frame frame6" width="50" height="300" xmlns="http://www.w3.org/2000/svg"></svg>
    <svg class="frame frame7" width="50" height="300" xmlns="http://www.w3.org/2000/svg"></svg>
    <svg class="frame frame8" width="50" height="300" xmlns="http://www.w3.org/2000/svg"></svg>
  </div>

  <style>
    .frame { outline: 1px dashed hsl(180 0% 50% / 0.1); }
  </style>
`

createFrame(root.querySelector<SVGSVGElement>('.frame1')!, {
  animator,
  ...createFrameHeaderSettings({
    // styled: true,
    // animated: true,
    // padding: 0,
    // strokeWidth: 1,
    // decoWidth: 4,
    // direction: 'horizontal',
    // align: 'left',
    // contentLength: 0,
  })
})

createFrame(root.querySelector<SVGSVGElement>('.frame2')!, {
  animator,
  ...createFrameHeaderSettings({
    padding: 4,
    strokeWidth: 2,
    decoWidth: 6,
    contentLength: 100
  })
})

createFrame(root.querySelector<SVGSVGElement>('.frame3')!, {
  animator,
  ...createFrameHeaderSettings({ align: 'right' })
})

createFrame(root.querySelector<SVGSVGElement>('.frame4')!, {
  animator,
  ...createFrameHeaderSettings({
    align: 'right',
    padding: 4,
    strokeWidth: 2,
    decoWidth: 6,
    contentLength: 100
  })
})

createFrame(root.querySelector<SVGSVGElement>('.frame5')!, {
  animator,
  ...createFrameHeaderSettings({ direction: 'vertical', align: 'top' })
})

createFrame(root.querySelector<SVGSVGElement>('.frame6')!, {
  animator,
  ...createFrameHeaderSettings({
    direction: 'vertical',
    align: 'top',
    padding: 4,
    strokeWidth: 2,
    decoWidth: 6,
    contentLength: 100
  })
})

createFrame(root.querySelector<SVGSVGElement>('.frame7')!, {
  animator,
  ...createFrameHeaderSettings({ direction: 'vertical', align: 'bottom' })
})

createFrame(root.querySelector<SVGSVGElement>('.frame8')!, {
  animator,
  ...createFrameHeaderSettings({
    direction: 'vertical',
    align: 'bottom',
    padding: 4,
    strokeWidth: 2,
    decoWidth: 6,
    contentLength: 100
  })
})

const update = (): void => {
  active = !active
  animator.send('update')
  setTimeout(update, active ? 3_000 : 1_500)
}

animator.send('setup')
update()
