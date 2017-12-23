# Loader Tool

Arwes uses a simple tool to load audio and image resources. Audio files are
loaded only to be playable and images are loaded completely before saying
those resources were loaded.

```javascript
import { createLoader } from 'arwes';

const loader = createLoader();

const images = [
  '/img/photo.jpg',
  '/img/wallpaper.jpg'
];
const sounds = [
  '/sound/song.mp3',
  '/sound/ringtone.mp3'
];

loader.load({ images, sounds }).then(() => {
  console.log('Resources were loaded.');
}, () => {
  console.error('Error when loading.');
});
```

The loader returns a promise. If any of the resources fails, the promise fails.

You can send an optional `timeout` (by default `30000` ms).

```javascript
loader.load({ images, sounds }, { timeout: 5000 }).then(() => {
  console.log('Resources were loaded.');
}, () => {
  console.error('Error when loading.');
});
```
