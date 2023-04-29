import { createFrameOctagonClip } from '@arwes/frames';

const root = document.querySelector('#root') as HTMLDivElement;
const octagon = document.createElement('div');

root.appendChild(octagon);
Object.assign(octagon.style, {
  width: '200px',
  height: '100px',
  clipPath: createFrameOctagonClip({
    leftTop: true,
    rightTop: false,
    rightBottom: true,
    leftBottom: false
  }),
  background: '#077'
});
