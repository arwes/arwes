import { createFramePentagonClip } from '@arwes/frames';

const root = document.querySelector('#root') as HTMLDivElement;
const octagon = document.createElement('div');

root.appendChild(octagon);
Object.assign(octagon.style, {
  width: '200px',
  height: '100px',
  clipPath: createFramePentagonClip({ squareSize: '1rem' }),
  background: '#077'
});
