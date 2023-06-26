import { createFrameKranoxClip } from '@arwes/frames';

const root = document.querySelector('#root') as HTMLDivElement;
const box = document.createElement('div');

root.appendChild(box);
Object.assign(box.style, {
  width: '200px',
  height: '400px',
  background: '#077',
  clipPath: createFrameKranoxClip({
    padding: 4,
    strokeWidth: 2,
    squareSize: 12,
    smallLineLength: 12,
    largeLineLength: 48
  })
});
