import { createFrameOctagonClip } from '@arwes/frames';

const root = document.querySelector('#root') as HTMLDivElement;
const box = document.createElement('div');

root.appendChild(box);
Object.assign(box.style, {
  width: '200px',
  height: '100px',
  clipPath: createFrameOctagonClip({ squareSize: '1rem' }),
  background: '#077'
});
