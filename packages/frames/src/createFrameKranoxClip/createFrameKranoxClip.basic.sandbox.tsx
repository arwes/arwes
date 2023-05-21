import { createFrameKranoxClip } from '@arwes/frames';

const root = document.querySelector('#root') as HTMLDivElement;
const box = document.createElement('div');

root.appendChild(box);
Object.assign(box.style, {
  width: '200px',
  height: '400px',
  background: '#077',
  clipPath: createFrameKranoxClip({ squareSize: '1rem' })
});
